<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { File, ListFilter } from 'lucide-svelte';
  import PreviewDocumentSheet from '@/lib/components/document-sheet/preview-document-sheet.svelte';
  import EditDocumentSheet from '@/lib/components/document-sheet/edit-document-sheet.svelte';
  import { deleteDocument, updateDocument } from '@/pb';
  import { invalidateAll } from '$app/navigation';
  import type { Document } from '@/pb/types';
  import ValidUntilCell from '@/lib/components/valid-until-cell.svelte';
  import EmptyState from '@/lib/components/empty-state.svelte';
  import DocumentTable from '@/lib/components/document-table.svelte';

  const { data } = $props();
  const documents = $derived(data.activeDocuments);

  let open = $state(false);
  let previewId = $state<string | null>(null);
  $effect(() => {
    if (previewId) {
      open = true;
    }
  });
  $effect(() => {
    if (!open) {
      previewId = null;
    }
  });
  const previewDocument = $derived(documents.find((doc) => doc.id === previewId));

  let openEdit = $state(false);
  let editId = $state<string | null>(null);
  $effect(() => {
    if (editId) {
      openEdit = true;
    }
  });
  $effect(() => {
    if (!openEdit) {
      editId = null;
    }
  });

  const onEdit = () => {
    editId = previewId;
    open = false;
  };
  const editDocument = $derived(documents.find((doc) => doc.id === editId));
</script>

{#snippet validUntilCell({ row }: { row: Document })}
  <ValidUntilCell document={row} />
{/snippet}

<PreviewDocumentSheet
  bind:open
  document={previewDocument}
  onEdit={() => {
    onEdit();
  }}
/>
<EditDocumentSheet
  bind:open={openEdit}
  document={editDocument}
  onDelete={async (id) => {
    await deleteDocument(id);
    await invalidateAll();
    openEdit = false;
  }}
  onSave={async (documentProps) => {
    if (!editId) return;
    await updateDocument(editId, documentProps);
    await invalidateAll();
    openEdit = false;
  }}
/>

<div class="flex items-center">
  <h1 class="text-lg font-semibold md:text-2xl">Documents</h1>
  <div class="ml-auto flex items-center gap-2">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button
          variant="outline"
          size="sm"
          class="h-7 gap-1 text-sm"
          builders={[builder]}
        >
          <ListFilter class="h-3.5 w-3.5" />
          <span class="sr-only sm:not-sr-only">Filter</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Label>Filter by</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked>Fulfilled</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem>Declined</DropdownMenu.CheckboxItem>
        <DropdownMenu.CheckboxItem>Refunded</DropdownMenu.CheckboxItem>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
    <Button size="sm" variant="outline" class="h-7 gap-1 text-sm">
      <File class="h-3.5 w-3.5" />
      <span class="sr-only sm:not-sr-only">Export</span>
    </Button>
  </div>
</div>
{#if documents.length > 0}
  <DocumentTable {documents} onRowClick={(rowId) => (previewId = rowId)} />
{:else}
  <EmptyState
    title="You have no documents"
    subtitle="Drag and drop a file or click the button below to upload a document."
    buttonLabel="Add Document"
    onClick={() => {
      open = true;
    }}
  />
{/if}
