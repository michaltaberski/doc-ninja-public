<script lang="ts" generics="T extends Record<string, any>">
  import * as Table from '$lib/components/ui/table';
  import { createDataTable, type DataTableColumn } from './data-table-utils.svelte';

  type Props<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
    idKey?: keyof T;
    class?: string;
    onRowClick?: (rowId: string, rowData: T) => void;
  };

  const {
    columns,
    data,
    idKey = 'id',
    onRowClick,
    class: classNames
  }: Props<T> = $props();

  const table = $derived(createDataTable({ data, columns, idKey }));
  const dataByKey = $derived(
    Object.fromEntries(data.map((row) => [row[idKey] as string, row]))
  );
</script>

<Table.Root class={classNames}>
  <Table.Header>
    <Table.Row>
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
          <Table.Cell>
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
