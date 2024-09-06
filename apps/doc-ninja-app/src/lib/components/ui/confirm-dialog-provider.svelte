<script lang="ts">
  import { getConfirmDialogState } from '@/lib/confirm-dialog-state.svelte';
  import ConfirmDialog from './confirm-dialog.svelte';

  const confirmDialogState = getConfirmDialogState();
</script>

<ConfirmDialog
  open={confirmDialogState.open}
  {...confirmDialogState.confirmDialogProps}
/>
