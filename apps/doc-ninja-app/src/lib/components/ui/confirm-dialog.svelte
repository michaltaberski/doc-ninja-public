<script lang="ts">
  import * as AlertDialog from '$lib/components/ui/alert-dialog';
  import { Button } from './button';

  let isConfirming = $state(false);
  let {
    open = $bindable(),
    confirmLabel = 'Ok',
    title,
    message,
    onConfirm,
    onCloseComplete
  }: {
    open?: boolean;
    confirmLabel?: string;
    title?: string;
    message?: string;
    onConfirm?: () => Promise<void>;
    onCloseComplete?: () => void;
  } = $props();
</script>

<AlertDialog.Root
  {open}
  onOpenChange={(newState) => {
    open = newState;
  }}
>
  <AlertDialog.Content onoutroend={onCloseComplete} class="z-50">
    <AlertDialog.Header>
      <AlertDialog.Title>{title}</AlertDialog.Title>
      <AlertDialog.Description>
        {message}
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button
        disabled={isConfirming}
        onclick={async () => {
          isConfirming = true;
          await onConfirm?.();
          isConfirming = false;
          open = false;
        }}
      >
        {confirmLabel}
        {isConfirming ? '...' : ''}
      </Button>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
