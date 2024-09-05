<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import DropdownMenu from '$lib/components/dropdown-menu.svelte';
  import { logout } from '@/pb/index.js';
  import { CircleUser } from 'lucide-svelte';
</script>

<header
  class="bg-muted/40 flex h-[60px] min-h-[60px] items-center gap-4 border-b px-4 lg:px-6"
>
  <div class="w-full flex-1"></div>
  <DropdownMenu
    align="end"
    options={[
      { label: 'My Account' },
      'SEPARATOR',
      { item: 'Settings', onclick: () => console.log('Settings') },
      { item: 'Support', onclick: () => console.log('Support') },
      'SEPARATOR',
      {
        item: 'Logout',
        onclick: () => {
          logout();
          invalidateAll();
        }
      }
    ]}
  >
    {#snippet children({ builders })}
      <Button {builders} variant="secondary" size="icon" class="rounded-full">
        <CircleUser class="h-5 w-5" />
        <span class="sr-only">Toggle user menu</span>
      </Button>
    {/snippet}
  </DropdownMenu>
</header>
