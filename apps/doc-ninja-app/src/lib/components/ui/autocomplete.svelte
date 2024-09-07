<script lang="ts" generics="T">
  import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
  import * as Popover from './popover';
  import { Button } from './button';
  import { SearchIcon } from 'lucide-svelte';
  import { cn } from '@/lib/utils';

  type Option<T> = {
    value: T;
    label: string;
  };

  type Props<T> = {
    value?: T;
    options: Option<T>[];
    onSelect?: (value: T) => void;
    placeholder?: string;
    onCreate?: (newValue: string) => void;
  };

  let {
    value = $bindable(),
    options,
    placeholder,
    onCreate,
    onSelect
  }: Props<T> = $props();

  let open = $state(false);
  let search = $state('');
  let highlightedIndex = $state(-1);

  const selectedLabel = $derived(options.find((f) => f.value === value)?.label);

  const showCreate = $derived(
    !!onCreate && search.length > 0 && !options.some((f) => f.label === search)
  );

  const filteredOptions = $derived(
    options.filter((f) => f.label.toLowerCase().startsWith(search.toLowerCase()))
  );

  const handleClose = () => {
    search = '';
    highlightedIndex = -1;
    open = false;
  };

  const handleSelect = () => {
    const newValue = options[highlightedIndex]?.value;
    if (newValue) {
      value = newValue;
      onSelect?.(newValue);
      handleClose();
    }
  };

  const handleCreate = () => {
    onCreate?.(search);
    handleClose();
  };

  $effect(() => {
    if (filteredOptions.length === 0) {
      highlightedIndex = 0;
    }
  });
</script>

<Popover.Root
  bind:open
  onOpenChange={(newOpenState) => {
    if (!newOpenState) handleClose();
  }}
>
  <Popover.Trigger asChild let:builder>
    <Button
      builders={[builder]}
      variant="outline"
      role="combobox"
      aria-expanded={open}
      class="w-[200px] justify-between"
    >
      {selectedLabel}
      {#if !selectedLabel}
        <span class="text-muted-foreground">{placeholder}</span>
      {/if}
      <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <div class="flex items-center border-b px-2">
      <SearchIcon class="mr-2 h-4 w-4 shrink-0 opacity-50" />
      <input
        bind:value={search}
        placeholder="Search..."
        class="placeholder:text-muted-foreground flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
        onkeydown={(e) => {
          if (e.key === 'Enter') {
            if (highlightedIndex === filteredOptions.length) {
              handleCreate?.();
            } else {
              handleSelect();
            }
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            highlightedIndex = Math.min(
              highlightedIndex + 1,
              filteredOptions.length + (showCreate ? 0 : -1)
            );
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            highlightedIndex = Math.max(highlightedIndex - 1, 0);
          }
        }}
      />
    </div>
    <div class="flex flex-col gap-0.5 p-1">
      {#each filteredOptions as option, index}
        <div
          role="button"
          class={cn('rounded px-2 py-1 text-sm', {
            'bg-accent': index === highlightedIndex
          })}
          onmouseenter={() => (highlightedIndex = index)}
          onclick={handleSelect}
        >
          {option.label}
        </div>
      {/each}
      {#if showCreate}
        <div
          role="button"
          class={cn('rounded px-2 py-1 text-sm', {
            'bg-accent': highlightedIndex === filteredOptions.length
          })}
          onmouseenter={() => (highlightedIndex = filteredOptions.length)}
          onclick={handleCreate}
        >
          Create "{search}"
        </div>
      {/if}
    </div>
  </Popover.Content>
</Popover.Root>
