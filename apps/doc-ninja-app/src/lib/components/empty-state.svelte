<script lang="ts">
  import { cn } from '../utils';
  import { Button } from './ui/button';

  const {
    title,
    subtitle,
    buttonLabel,
    onClick,
    class: className
  }: {
    title?: string;
    subtitle?: string;
    buttonLabel?: string;
    onClick?: () => void;
    class?: string;
  } = $props();
</script>

<div
  class={cn(
    'flex h-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm',
    className
  )}
>
  <div class="flex flex-col items-center gap-1 text-center">
    {#if title}
      <h3 class="text-2xl font-bold tracking-tight">{title}</h3>
    {/if}
    {#if subtitle}
      <p class="text-muted-foreground text-sm">
        {subtitle}
      </p>
    {/if}
    {#if buttonLabel && onClick}
      <Button size="sm" class="mt-4" on:click={onClick}>
        {buttonLabel || 'Button label missing'}
      </Button>
    {/if}
  </div>
</div>
