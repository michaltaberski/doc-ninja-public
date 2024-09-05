<script lang="ts" generics="T extends Record<string, any>">
  import * as Table from '$lib/components/ui/table';
  import { createDataTable, type DataTableColumn } from './data-table-utils.svelte';

  type Props<T> = {
    columns: (DataTableColumn<T> | false)[];
    data: T[];
    idKey?: keyof T;
    class?: string;
    cellClass?: string;
    onRowClick?: (rowId: string, rowData: T) => void;
  };

  const {
    data,
    idKey = 'id',
    onRowClick,
    cellClass,
    class: classNames,
    ...props
  }: Props<T> = $props();

  const columns = $derived(props.columns.filter(Boolean) as DataTableColumn<T>[]);
  const table = $derived(createDataTable({ data, columns, idKey }));
  const dataByKey = $derived(
    Object.fromEntries(data.map((row) => [row[idKey] as string, row]))
  );
</script>

<Table.Root class={classNames}>
  <Table.Header>
    <Table.Row class="bg-slate-50 hover:bg-slate-50">
      {#each table.headers as dataTableHeader}
        <Table.Head class={dataTableHeader.class}>
          {dataTableHeader.label}
        </Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each table.rows as row (row.id)}
      <Table.Row onclick={() => onRowClick?.(row.id, dataByKey[row.id])}>
        {#each row.cells as cell}
          <Table.Cell class={cellClass}>
            {#if cell.snippet}
              {@render cell.snippet({
                value: cell.value,
                row: dataByKey[row.id]
              })}
            {:else}
              {cell.value}
            {/if}
          </Table.Cell>
        {/each}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
