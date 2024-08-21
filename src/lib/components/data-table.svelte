<script lang="ts">
  import * as Table from '$lib/components/ui/table';
  import { createDataTable, type DataTableOptions } from './data-table-utils.svelte';

  type User = { name: string; email: string };

  const USERS_DEMO_DATA: User[] = [
    { name: 'Liam Johnson', email: 'liam@example.com' },
    { name: 'Olivia Smith', email: '' },
    { name: 'Noah Williams', email: '' },
    { name: 'Emma Brown', email: '' },
    { name: 'Liam Johnson', email: '' },
    { name: 'Olivia Smith', email: '' },
    { name: 'Emma Brown', email: '' }
  ];

  const options: DataTableOptions<User> = {
    data: USERS_DEMO_DATA,
    columns: [
      { key: 'name', label: 'Customer' },
      { key: 'email', label: 'Email' }
    ]
  };

  const table = createDataTable(options);
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
