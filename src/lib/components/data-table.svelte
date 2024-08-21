<script lang="ts" generics="T extends Record<string, any>">
  import * as Table from '$lib/components/ui/table';
  import {
    createDataTable,
    type DataTableColumn,
    type DataTableOptions
  } from './data-table-utils.svelte';

  type Props<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
  };

  let { columns, data }: Props<T> = $props();

  const options: DataTableOptions<T> = $state({
    data,
    columns
  });

  const table = $derived(createDataTable(options));
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      {#each table.headers as dataTableHeader}
        <Table.Head>
          {dataTableHeader.label}
        </Table.Head>
      {/each}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each table.rows as row}
      <Table.Row>
        {#each row.cells as cell}
          <Table.Cell>
            {cell.value}
          </Table.Cell>
        {/each}
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
