<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Tabs from '$lib/components/ui/tabs';
  import { File, ListFilter } from 'lucide-svelte';
  // import pathToPdf from './file1.pdf';

  import DemoTable from './table.svelte';
  import StatsCard from './stats-card.svelte';
  import DataTable from '@/lib/components/data-table.svelte';
  // import { PdfViewer } from 'svelte-pdf-simple';

  const data = $state([
    { id: 1, name: 'John Doe', email: '' },
    { id: 2, name: 'Jane o', email: '' },
    { id: 3, name: 'John Smith', email: '' },
    { id: 4, name: 'Jane Smith', email: '' }
  ]);
</script>

<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
  <div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
    <div class="grid gap-4 sm:grid-cols-2">
      <Card.Root>
        <Card.Header class="pb-2">
          <Card.Description>
            <Button
              onclick={() => {
                data[0].name = 'John';
              }}>John</Button
            >
            <Button
              onclick={() => {
                data[0].name = 'Barbara';
              }}>Barbara</Button
            >
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <!--
          <div class="h-[640px] border border-red-500 p-2">
            <PdfViewer props={{ url: pathToPdf, scale: 2 }} class="border" />
          </div>
          -->
        </Card.Content>
      </Card.Root>
      <StatsCard />
    </div>
    <Tabs.Root value="week">
      <div class="flex items-center">
        <Tabs.List>
          <Tabs.Trigger value="week">Week</Tabs.Trigger>
          <Tabs.Trigger value="month">Month</Tabs.Trigger>
          <Tabs.Trigger value="year">Year</Tabs.Trigger>
        </Tabs.List>
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
      <Tabs.Content value="week">
        <Card.Root>
          <Card.Header class="px-7">
            <Card.Title>Orders</Card.Title>
            <Card.Description>Recent orders from your store.</Card.Description>
          </Card.Header>
          <Card.Content>
            <DataTable
              {data}
              columns={[
                { label: 'ID', key: 'id' },
                { label: 'Name', key: 'name' },
                { label: 'Email', key: 'email' }
              ]}
            />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
      <Tabs.Content value="month">
        <Card.Root>
          <Card.Header class="px-7">
            <Card.Title>Month</Card.Title>
          </Card.Header>
          <Card.Content>
            <DemoTable />
          </Card.Content>
        </Card.Root>
      </Tabs.Content>
    </Tabs.Root>
  </div>
</main>
