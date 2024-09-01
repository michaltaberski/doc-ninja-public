<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import * as Tabs from '$lib/components/ui/tabs';
  import LocalFilePreview from './file-preview-local.svelte';
  import type { NewDocument } from '@/pb/types';
  import DocumentForm from './document-form.svelte';
  import { today } from '@internationalized/date';
  import { cn } from '@/lib/utils';
  import PreviewFileNavigation from './preview-file-navigation.svelte';
  import { getDocuments } from '@/pb';
  import DocumentSelect from '../document-select.svelte';
  import FormFiled from '../form-filed.svelte';

  let {
    open = $bindable(),
    onCancel,
    onCreateNew,
    onAddFilesToDocument,
    fileList
  }: {
    open?: boolean;
    onCancel?: () => void;
    onCreateNew?: (documentProps: NewDocument) => Promise<void>;
    onAddFilesToDocument?: (documentId: string, files: File[]) => Promise<void>;
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
  const handleCreateNew = async () => {
    isSaving = true;
    documentProps.files = files;
    await onCreateNew?.(documentProps);
    isSaving = false;
    onCancel?.();
  };
  const handleAddFilesToDocument = async () => {
    isSaving = true;
    await onAddFilesToDocument?.(selectedDocumentId!, files);
    isSaving = false;
    onCancel?.();
  };

  // svelte-ignore state_referenced_locally
  let selectedFile = $state(files[0]);
  $effect(() => {
    selectedFile = files[0];
  });

  let zoomedIn = $state(false);

  const documentsPromise = getDocuments();
  let selectedDocumentId = $state<string | undefined>(undefined);
  let activeTab = $state<'new-document' | 'add-to-document'>('new-document');
</script>

<!-- svelte-ignore state_referenced_locally -->
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
        <PreviewFileNavigation
          bind:currentFile={selectedFile}
          bind:zoomedIn
          {files}
          getFileName={(file) => file.name}
        />
      {/if}
    </Sheet.Header>
    <Sheet.Body>
      <Tabs.Root
        value={activeTab}
        onValueChange={(value) =>
          value && (activeTab = value as 'new-document' | 'add-to-document')}
      >
        <div class="flex p-6">
          <Tabs.List>
            <Tabs.Trigger value="new-document">Create new document</Tabs.Trigger>
            <Tabs.Trigger value="add-to-document">Add to document</Tabs.Trigger>
          </Tabs.List>
        </div>
        <Tabs.Content value="new-document">
          <DocumentForm bind:document={documentProps} disabled={isSaving} />
        </Tabs.Content>
        <Tabs.Content value="add-to-document">
          {#await documentsPromise}
            <div class="px-6">Loading documents...</div>
          {:then documents}
            <FormFiled label="Document" class="px-6">
              <DocumentSelect {documents} bind:selectedId={selectedDocumentId} />
            </FormFiled>
          {:catch error}
            <div class="px-6">Error: {error.message}</div>
          {/await}
        </Tabs.Content>
      </Tabs.Root>
    </Sheet.Body>
    <Sheet.Footer class="border-t p-6">
      <Button variant="outline" onclick={onCancel}>Cancel</Button>
      {#if activeTab === 'new-document'}
        <Button onclick={handleCreateNew} disabled={isSaving}>Save</Button>
      {:else if activeTab === 'add-to-document'}
        <Button
          onclick={handleAddFilesToDocument}
          disabled={isSaving || !selectedDocumentId}
        >
          Add to document
        </Button>
      {/if}
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
