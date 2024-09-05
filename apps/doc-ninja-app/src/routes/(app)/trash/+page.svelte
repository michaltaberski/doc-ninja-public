<script lang="ts">
  import { toast } from 'svelte-sonner';
  import { invalidateAll } from '$app/navigation';
  import DocumentTable from '@/lib/components/document-table.svelte';
  import EmptyState from '@/lib/components/empty-state.svelte';
  import { deleteDocumentPermanently, restoreDocument } from '@/pb/index.js';

  const { data } = $props();
  const documents = $derived(data.deletedDocuments);
</script>

<h1 class="text-lg font-semibold md:text-2xl">Trash</h1>
{#if documents.length > 0}
  <DocumentTable
    {documents}
    getActionsMenu={(row) => [
      {
        label: 'Restore',
        onclick: async () => {
          await restoreDocument(row.id);
          toast.success('Document restored');
          invalidateAll();
        }
      },
      {
        label: 'Delete permanently',
        variant: 'danger',
        onclick: async () => {
          await deleteDocumentPermanently(row.id);
          toast.success('Document deleted permanently');
          invalidateAll();
        }
      }
    ]}
  />
{:else}
  <EmptyState title="Your trash is empty" subtitle="Deleted documents goes here" />
{/if}
