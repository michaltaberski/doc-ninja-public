<script lang="ts">
  import DataTable from '@/lib/components/data-table.svelte';
  import { formatDate } from '@/lib/duration-utils';
  import type { Document, RowMeta } from '@/pb/types';
  import { CalendarDate } from '@internationalized/date';
  import ValidUntilCell from '@/lib/components/valid-until-cell.svelte';

  const {
    documents,
    onRowClick
  }: {
    documents: RowMeta<Document>[];
    onRowClick?: (rowId: string) => void;
  } = $props();
</script>

{#snippet validUntilCell({ row }: { row: Document })}
  <ValidUntilCell document={row} />
{/snippet}

{#snippet documentCell({ row }: { row: Document })}
  <div class="flex flex-col">
    <div>{row.reference}</div>
    <div class="text-muted-foreground text-xs">{row.supplier || '-'}</div>
  </div>
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
      }
    ]}
  />
</div>
