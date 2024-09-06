<script lang="ts">
  import Check from 'lucide-svelte/icons/check';
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import { cn } from '$lib/utils.js';
  import { tick } from 'svelte';
  import * as Popover from './popover';
  import * as Command from './command';
  import { Button } from './button';

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
    <Command.Root>
      <Command.Input placeholder="Search framework..." bind:value={search} />
      <Command.Empty>No framework found. {search}</Command.Empty>
      <Command.Group>
        {#each frameworks as framework (framework.value)}
          <Command.Item
            value={framework.value}
            onSelect={(currentValue) => {
              value = currentValue;
              closeAndFocusTrigger(ids.trigger);
            }}
          >
            <Check
              class={cn('mr-2 h-4 w-4', value !== framework.value && 'text-transparent')}
            />
            {framework.label}
          </Command.Item>
        {/each}
        <Command.Item value={search}>
          <Check class={cn('mr-2 h-4 w-4')} />
          {search}
        </Command.Item>
      </Command.Group>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
