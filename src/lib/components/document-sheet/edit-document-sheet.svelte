<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import { DownloadIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-svelte';
  import type { Document, RowMeta } from '@/pb/types';
  import DocumentForm from './document-form.svelte';
  import FilePreview from './file-preview.svelte';

  let {
    open = $bindable(),
    document,
    onDelete,
    onSave,
    onCancel
  }: {
    open?: boolean;
    document?: RowMeta<Document>;
    onSave?: (documentProps: Document) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    onCancel?: () => void;
  } = $props();

  let editableDocument = $state(document);
  let saving = $state(false);
  $effect(() => {
    editableDocument = document;
  });

  const documentId = $derived(document?.id);
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header>
      {#if document?.files.length}
        <FilePreview {document} file={document.files[0]} class="h-96 max-h-96" />
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
        <DocumentForm bind:document={editableDocument} disabled={saving} />
      {/if}
    </Sheet.Body>
    <Sheet.Footer class="flex border-t p-6 sm:justify-between">
      {#if documentId && onDelete}
        <Button
          variant="destructive"
          onclick={() => {
            onDelete(documentId);
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
