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

<div class="rounded-lg border">
  <DataTable
    data={documents}
    {onRowClick}
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
