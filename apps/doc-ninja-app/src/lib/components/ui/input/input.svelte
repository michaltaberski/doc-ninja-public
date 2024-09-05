<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import type { InputEvents } from './index.js';
  import { cn } from '$lib/utils.js';

  type $$Props = HTMLInputAttributes;
  type $$Events = InputEvents;

  let {
    class: className,
    value = $bindable(),
    readonly,
    ...rest
  } = $props() as $$Props & $$Events;
</script>

<input
  class={cn(
    'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  bind:value
  {readonly}
  {...rest}
/>
