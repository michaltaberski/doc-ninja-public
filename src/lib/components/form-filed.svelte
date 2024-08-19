<script lang="ts">
  import { cn } from '../utils';
  import { Label } from './ui/label';

  type Props = {
    label: string;
    class?: string;
    for?: string;
  };

  const { class: className, label, for: forProp } = $props() as Props;
</script>

<div class={cn('grid w-full items-center gap-2', className)}>
  <Label for={forProp}>{label}</Label>
  <slot />
</div>
