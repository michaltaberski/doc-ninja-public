<script lang="ts">
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import { tick } from 'svelte';
  import * as Popover from './popover';
  import { Button } from './button';
  import { SearchIcon } from 'lucide-svelte';

  const frameworks = $state([
    {
      value: 'sveltekit',
      label: 'SvelteKit'
    },
    {
      value: 'next.js',
      label: 'Next.js'
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js'
    },
    {
      value: 'remix',
      label: 'Remix'
    },
    {
      value: 'astro',
      label: 'Astro'
    }
  ]);

  let open = $state(false);
  let value = $state('');
  let search = $state('');

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label ?? 'Select a framework...'
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }
</script>

<Popover.Root bind:open let:ids>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedValue}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <div class="flex items-center border-b px-2">
      <SearchIcon class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        placeholder="Search..."
        class="placeholder:text-muted-foreground flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
    </div>
    <div class="flex flex-col gap-0.5 p-1">
      <div class="hover:bg-accent rounded px-2 py-1 text-sm">Value 1</div>
      <div class="hover:bg-accent rounded px-2 py-1 text-sm">Value 1</div>
      <div class="hover:bg-accent rounded px-2 py-1 text-sm">Value 1</div>
    </div>
  </Popover.Content>
</Popover.Root>
