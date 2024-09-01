<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import type { Snippet } from 'svelte';
  import { Button } from './button';

  let isOpened = $state(false);
  let isConfirming = $state(false);

  const {
    children,
    confirmLabel = 'Ok',
    title,
    description,
    onConfirm
  }: {
    children: Snippet<[]>;
    confirmLabel?: string;
    title?: string;
    description?: string;
    onConfirm?: () => Promise<void>;
  } = $props();
</script>

<AlertDialog.Root open={isOpened} onOpenChange={(newState) => (isOpened = newState)}>
  <AlertDialog.Trigger>
    {@render children()}
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>
        {description}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button
        onclick={async () => {
          isConfirming = true;
          await onConfirm?.();
          isConfirming = false;
          isOpened = false;
        }}
      >
        {#if isConfirming}
          ...
        {/if}
        {confirmLabel}</Button
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
