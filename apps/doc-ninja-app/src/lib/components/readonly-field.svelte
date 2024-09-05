<script lang="ts">
  import { cn } from '../utils';
  import { Label } from './ui/label';

  type Props = {
    label: string;
    class?: string;
    children: () => any;
  };

  const { class: className, label, children }: Props = $props();
</script>

<div class={cn('flex flex-col ', className)}>
  <div class="text-muted-foreground text-sm">{label}</div>
  <div class="mt-1 text-sm font-medium">{@render children()}</div>
</div>
