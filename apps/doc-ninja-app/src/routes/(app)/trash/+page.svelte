<script lang="ts">
  import DocumentTable from '@/lib/components/document-table.svelte';
  import EmptyState from '@/lib/components/empty-state.svelte';

  const { data } = $props();
  const documents = $derived(data.documents);
</script>

<h1 class="text-lg font-semibold md:text-2xl">Trash</h1>
{#if documents.length > 0}
  <DocumentTable {documents} />
{:else}
  <EmptyState title="Your trash is empty" />
{/if}
