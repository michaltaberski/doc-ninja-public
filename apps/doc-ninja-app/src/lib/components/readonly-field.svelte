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
  <div class="text-sm text-muted-foreground">{label}</div>
  <div class="font-medium">{@render children()}</div>
</div>
