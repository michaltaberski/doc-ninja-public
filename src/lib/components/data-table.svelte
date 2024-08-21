<script lang="ts" generics="T extends Record<string, any>">
  import * as Table from '$lib/components/ui/table';
  import { createDataTable, type DataTableColumn } from './data-table-utils.svelte';

  type Props<T> = {
    columns: DataTableColumn<T>[];
    data: T[];
  };

  const { columns, data }: Props<T> = $props();

  const table = $derived(createDataTable({ data, columns }));
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
