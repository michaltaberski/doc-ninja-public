<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import type { Document, RowMeta } from '@doc-ninja/data-layer';
  import DocumentForm from './document-form.svelte';
  import { cn } from '@/lib/utils';
  import PreviewFileNavigation from './preview-file-navigation.svelte';
  import FilePreviewRemote from './file-preview-remote.svelte';
  import { getConfirmDialogState } from '@/lib/confirm-dialog-state.svelte';

  const confirmDialgoCtx = getConfirmDialogState();
  let {
    open = $bindable(),
    document,
    onDelete,
    onSave
  }: {
    open?: boolean;
    document?: RowMeta<Document>;
    onSave?: (documentProps: Document) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
  } = $props();

  let editableDocument = $state(document);
  let saving = $state(false);
  $effect(() => {
    editableDocument = document;
  });

  const documentId = $derived(document?.id);

  let selectedFile = $state(document?.files[0]);
  $effect(() => {
    selectedFile = document?.files[0];
  });

  let zoomedIn = $state(false);
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header class={cn('relative max-h-full', zoomedIn && 'min-h-full')}>
      {#if document && selectedFile}
        <FilePreviewRemote
          {document}
          file={selectedFile}
          class={cn(zoomedIn ? 'min-h-full' : 'h-96')}
        />
      {/if}
      {#if selectedFile}
        <PreviewFileNavigation
          bind:currentFile={selectedFile}
          bind:zoomedIn
          files={document?.files || []}
        />
      {/if}
    </Sheet.Header>
    <Sheet.Body>
      <div class="flex flex-col p-6">
        <Sheet.Title class="text-2xl">
          {document ? document.reference : ''}
        </Sheet.Title>
        <Sheet.Description>
          {document ? document.supplier : ''}
        </Sheet.Description>
      </div>
      {#if editableDocument}
        <DocumentForm bind:document={editableDocument} />
      {/if}
    </Sheet.Body>
    <Sheet.Footer class="flex border-t p-6 sm:justify-between">
      {#if documentId && onDelete}
        <Button
          variant="danger"
          onclick={() => {
            confirmDialgoCtx.openConfirmDialog({
              title: 'Delete document',
              message: 'Are you sure you want to delete this document?',
              onConfirm: () => onDelete(documentId)
            });
          }}>Delete</Button
        >
      {/if}
      <div class="flex gap-2">
        <Button variant="outline" onclick={() => (open = false)} disabled={saving}>
          Cancel
        </Button>
        <Button onclick={() => editableDocument && onSave?.(editableDocument)}>
          Save
        </Button>
      </div>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
