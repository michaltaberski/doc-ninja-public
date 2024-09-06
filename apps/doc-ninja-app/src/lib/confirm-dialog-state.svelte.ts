import { getContext, setContext, type ComponentProps } from 'svelte';
import ConfirmDialog from '@/lib/components/ui/confirm-dialog.svelte';

export type ConfirmDialogProps = Omit<ComponentProps<ConfirmDialog>, 'children'>;

export class ConfirmDialogState {
  confirmDialogProps = $state<ConfirmDialogProps>({});
  open = $state(false);

  openConfirmDialog(confirmDialogProps: ConfirmDialogProps) {
    this.confirmDialogProps = confirmDialogProps;
    this.open = true;
  }

  closeConfirmDialog() {
    this.open = false;
  }

  onCloseComplete() {
    this.confirmDialogProps = {};
  }
}

const CONFIRM_DIALOG_KEY = Symbol('CONFIRM_DIALOG');

export function setConfirmDialogState() {
  return setContext(CONFIRM_DIALOG_KEY, new ConfirmDialogState());
}

export function getConfirmDialogState() {
  return getContext<ReturnType<typeof setConfirmDialogState>>(CONFIRM_DIALOG_KEY);
}
