<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Tabs from '$lib/components/ui/tabs';
  import { File, ListFilter } from 'lucide-svelte';
  import DemoTable from './table.svelte';
  import DataTable from '@/lib/components/data-table.svelte';
  import PreviewDocumentSheet from '@/lib/components/document-sheet/preview-document-sheet.svelte';
  import EditDocumentSheet from '@/lib/components/document-sheet/edit-document-sheet.svelte';
  import { deleteDocument, updateDocument } from '@/pb';
  import { invalidateAll } from '$app/navigation';
  import { formatDate } from '@/lib/duration-utils';
  import type { Document } from '@/pb/types';
  import { CalendarDate } from '@internationalized/date';
  import ValidUntilCell from '@/lib/components/valid-until-cell.svelte';

  const { data } = $props();
  const documents = $derived(data.documents);

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

<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
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
  <div class="rounded border">
    <DataTable
      data={documents}
      onRowClick={(rowId) => (previewId = rowId)}
      columns={[
        { label: 'Supplier', key: 'supplier', headerClass: 'w-[300px]' },
        { label: 'Reference', key: 'reference' },
        {
          label: 'Date',
          key: 'issueDate',
          headerClass: 'w-[140px]',
          format: (date) => formatDate(date as CalendarDate)
        },
        {
          label: 'Valid until',
          key: 'validityPeriod',
          headerClass: 'w-[180px]',
          snippet: validUntilCell
        }
      ]}
    />
  </div>
</div>
