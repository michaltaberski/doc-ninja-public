<script>
  import { goto, invalidateAll } from '$app/navigation';
  import { Button } from '@/lib/components/ui/button';
  import { login } from '@/pb';

  const { data } = $props();

  let isLoaded = $state(false);
  $effect(() => {
    if (data.currentUser) {
      goto('/');
    } else {
      isLoaded = true;
    }
  });
</script>

{#if isLoaded}
  <Button
    onclick={async () => {
      await login('michal', 'taberski123');
      invalidateAll();
    }}>Login</Button
  >
{:else}
  <div class="flex h-full items-center justify-center">
    <p class="text-lg font-semibold text-muted-foreground">Loading...</p>
  </div>
{/if}
