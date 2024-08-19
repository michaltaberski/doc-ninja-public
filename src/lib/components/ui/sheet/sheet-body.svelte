<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils.js';

  type $$Props = {
    class?: string;
  } & HTMLAttributes<HTMLDivElement>;

  const { class: className, children, ...restProps } = $props() as $$Props;
</script>

<div class={cn('flex flex-1 flex-col', className)} {...restProps}>
  <slot />
</div>
