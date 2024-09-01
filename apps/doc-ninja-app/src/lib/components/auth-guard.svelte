<script lang="ts">
  import { goto } from '$app/navigation';
  const { currentUser } = $props();

  let isLoaded = $state(false);
  $effect(() => {
    if (currentUser) {
      isLoaded = true;
    } else {
      goto('/login');
    }
  });
</script>

<!-- svelte-ignore slot_element_deprecated -->
{#if isLoaded}
  <slot />
{:else}
  <div class="flex h-full items-center justify-center">
    <p class="text-lg font-semibold text-muted-foreground">Loading...</p>
  </div>
{/if}
