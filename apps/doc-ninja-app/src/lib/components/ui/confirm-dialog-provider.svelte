<script lang="ts">
  import { getConfirmDialogState } from '@/lib/confirm-dialog-state.svelte';
  import ConfirmDialogNew from './confirm-dialog-new.svelte';

  const confirmDialogState = getConfirmDialogState();
</script>

<ConfirmDialogNew
  open={confirmDialogState.open}
  {...confirmDialogState.confirmDialogProps}
/>
