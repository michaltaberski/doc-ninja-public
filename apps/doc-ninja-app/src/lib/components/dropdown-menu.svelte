<script lang="ts">
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import type { Builder } from 'bits-ui';
  import {
    getIsItem,
    getIsSectionLabel,
    getIsSeparator,
    type DropdownMenuOption
  } from './dropdown-menu-utils';

  const {
    options,
    children,
    align
  }: {
    children: (props: { builders: Builder[] }) => any;
    align?: 'start' | 'end' | 'center';
    options: DropdownMenuOption[];
  } = $props();
</script>

{#snippet dropdownMenuOption(option: DropdownMenuOption)}
  {#if getIsSeparator(option)}
    <DropdownMenu.Separator />
  {:else if getIsItem(option)}
    <DropdownMenu.Item onclick={option.onclick}>{option.label}</DropdownMenu.Item>
  {:else if getIsSectionLabel(option)}
    <DropdownMenu.Label>{option.sectionLabel}</DropdownMenu.Label>
  {/if}
{/snippet}

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    {@render children({ builders: [builder] })}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content {align}>
    {#each options as option}
      {@render dropdownMenuOption(option)}
    {/each}
  </DropdownMenu.Content>
</DropdownMenu.Root>
