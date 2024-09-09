<script lang="ts">
  import DataTable from '@/lib/components/data-table.svelte';
  import { formatDate } from '@/lib/duration-utils';
  import type { Document, RowMeta } from '@doc-ninja/data-layer';
  import ValidUntilCell from '@/lib/components/valid-until-cell.svelte';
  import type { DropdownMenuOption } from './dropdown-menu-utils';
  import DropdownMenu from './dropdown-menu.svelte';
  import { EllipsisIcon } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { CalendarDate } from '@internationalized/date';

  const {
    documents,
    onRowClick,
    getActionsMenu
  }: {
    getActionsMenu?: (row: RowMeta<Document>) => DropdownMenuOption[];
    documents: RowMeta<Document>[];
    onRowClick?: (rowId: string) => void;
  } = $props();
</script>

{#snippet validUntilCell({ row }: { row: RowMeta<Document> })}
  <ValidUntilCell document={row} />
{/snippet}

{#snippet documentCell({ row }: { row: RowMeta<Document> })}
  <div class="flex flex-col">
    <div>{row.reference}</div>
    <div class="text-muted-foreground text-xs">{row.supplier || '-'}</div>
  </div>
{/snippet}

{#snippet dropdownActionsMenu({ row }: { row: RowMeta<Document> })}
  <DropdownMenu options={getActionsMenu?.(row) || []} align="end">
    {#snippet children({ builders })}
      <Button
        {builders}
        variant="outline"
        size="icon"
        class="ml-auto h-8 w-8"
        onclick={(e: Event) => e.stopPropagation()}
      >
        <EllipsisIcon class="h-4 w-4" />
        <span class="sr-only">Toggle notifications</span>
      </Button>
    {/snippet}
  </DropdownMenu>
{/snippet}

<div class="overflow-hidden rounded-lg border">
  <DataTable
    data={documents}
    {onRowClick}
    cellClass="py-1 h-[45px]"
    columns={[
      {
        label: 'Document',
        key: 'id',
        snippet: documentCell
      },
      // { label: 'Supplier', key: 'supplier', headerClass: 'w-[250px]' },
      // { label: 'Reference', key: 'reference' },
      {
        label: 'Date',
        key: 'issueDate',
        headerClass: 'w-[140px]',
        format: (date) => formatDate(date as CalendarDate)
      },
      {
        label: 'Valid until',
        key: 'validityPeriod',
        headerClass: 'w-[160px]',
        snippet: validUntilCell
      },
      !!getActionsMenu && {
        label: '',
        key: 'id',
        headerClass: 'w-[60px]',
        snippet: dropdownActionsMenu
      }
    ]}
  />
</div>
