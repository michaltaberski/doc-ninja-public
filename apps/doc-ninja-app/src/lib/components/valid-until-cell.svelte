<script lang="ts">
  import { CircleCheck, CircleX } from 'lucide-svelte';
  import { formatDate, getIsFutureDate, validUntil } from '@/lib/duration-utils';
  import type { Document } from '@/pb/types';

  const { document }: { document: Document } = $props();

  const date = validUntil(document);
</script>

{#if date}
  <div class="flex items-center gap-1.5">
    {#if getIsFutureDate(date)}
      <CircleCheck class="size-4 text-green-600" />
    {:else}
      <CircleX class="size-4 text-red-600" />
    {/if}
    {formatDate(date)}
  </div>
{/if}
