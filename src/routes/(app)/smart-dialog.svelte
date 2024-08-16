<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog';
  type Props = { open: boolean };

  let { open = $bindable() }: Props = $props();
</script>

<Dialog.Root
  {open}
  onOpenChange={(newState) => {
    open = newState;
  }}
  portal={null}
>
  <Dialog.Content showClose={false}>
    <Dialog.Header>
      <Dialog.Title>Drop file to add new document</Dialog.Title>
      <Dialog.Description>
        File has to be in PDF format and not exceed 10MB in size.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
