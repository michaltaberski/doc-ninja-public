<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { File, ListFilter } from 'lucide-svelte';
  import EditDocumentSheet from '@/lib/components/document-sheet/edit-document-sheet.svelte';
  import { deleteDocument, updateDocument } from '@/pb';
  import { invalidateAll } from '$app/navigation';
  import type { Document } from '@/pb/types';
  import ValidUntilCell from '@/lib/components/valid-until-cell.svelte';
  import EmptyState from '@/lib/components/empty-state.svelte';
  import DocumentTable from '@/lib/components/document-table.svelte';
  import { getDocumentPreviewState } from '@/lib/document-preview-state.svelte.js';
  import { getConfirmDialogState } from '@/lib/confirm-dialog-state.svelte.js';

  const { data } = $props();
  const documents = $derived(data.activeDocuments);
  const documentPreviewCtx = getDocumentPreviewState();
  const confirmDialgoCtx = getConfirmDialogState();

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
    editId = documentPreviewCtx.documentPreviewProps.document?.id || null;
    documentPreviewCtx.closeDocumentPreview();
  };
  const editDocument = $derived(documents.find((doc) => doc.id === editId));
</script>

{#snippet validUntilCell({ row }: { row: Document })}
  <ValidUntilCell document={row} />
{/snippet}

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

    <Button
      size="sm"
      variant="outline"
      class="h-7 gap-1 text-sm"
      onclick={() => {
        confirmDialgoCtx.openConfirmDialog({
          title: 'Export Documents',
          description: 'Are you sure you want to export all documents?',
          onConfirm: async () => {
            await new Promise((r) => setTimeout(r, 1000));
            console.log('Exporting documents');
          }
        });
      }}
    >
      <File class="h-3.5 w-3.5" />
      <span class="sr-only sm:not-sr-only">Export</span>
    </Button>
  </div>
</div>
{#if documents.length > 0}
  <DocumentTable
    {documents}
    onRowClick={(rowId) => {
      const document = documents.find((doc) => doc.id === rowId);
      if (document) {
        documentPreviewCtx.openDocumentPreview({ document, onEdit });
      }
    }}
  />
{:else}
  <EmptyState
    title="You have no documents"
    subtitle="Drag and drop a file or click the button below to upload a document."
    buttonLabel="Add Document"
  />
{/if}
