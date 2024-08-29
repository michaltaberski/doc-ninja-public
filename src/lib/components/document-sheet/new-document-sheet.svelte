<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import LocalFilePreview from './local-file-preview.svelte';
  import type { NewDocument } from '@/pb/types';
  import DocumentForm from './document-form.svelte';
  import { today } from '@internationalized/date';
  import { cn } from '@/lib/utils';
  import PreviewFileNavigation from './preview-file-navigation.svelte';

  let {
    open = $bindable(),
    onCancel,
    onSave,
    fileList
  }: {
    open?: boolean;
    onCancel?: () => void;
    onSave?: (documentProps: NewDocument) => Promise<void>;
    fileList?: FileList;
  } = $props();

  let documentProps = $state<NewDocument>({
    files: [...(fileList || [])],
    supplier: '',
    reference: '',
    issueDate: today(Intl.DateTimeFormat().resolvedOptions().timeZone),
    validityPeriod: undefined,
    owner: ''
  });

  const files = $derived([...(fileList || [])]);

  let isSaving = $state(false);
  const handleSave = async () => {
    isSaving = true;
    documentProps.files = files;
    await onSave?.(documentProps);
    isSaving = false;
    onCancel?.();
  };

  let selectedFile = $state(files[0]);
  $effect(() => {
    selectedFile = files[0];
  });

  let zoomedIn = $state(false);
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header class={cn('relative max-h-full', zoomedIn && 'min-h-full')}>
      {#if document && selectedFile}
        <LocalFilePreview
          file={selectedFile}
          class={cn(zoomedIn ? 'min-h-full' : 'h-96')}
        />
      {/if}
      {#if selectedFile}
        <PreviewFileNavigation bind:currentFile={selectedFile} bind:zoomedIn {files} />
      {/if}
    </Sheet.Header>
    <Sheet.Body>
      <div class="flex flex-col p-6">
        <Sheet.Title class="text-2xl">New Document</Sheet.Title>
        <Sheet.Description>
          Fill out the form to add a new document to the library.
        </Sheet.Description>
      </div>
      <DocumentForm bind:document={documentProps} disabled={isSaving} />
    </Sheet.Body>
    <Sheet.Footer class="border-t p-6">
      <Button variant="outline" onclick={onCancel}>Cancel</Button>
      <Button onclick={handleSave}>Save</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
