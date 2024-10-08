<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import { PencilIcon } from 'lucide-svelte';
  import {
    deleteFileFromDocument,
    getDocumentFilePublicUrl,
    type Document,
    type RowMeta
  } from '@doc-ninja/data-layer';
  import ReadonlyField from '../readonly-field.svelte';
  import ValidUntilCell from '../valid-until-cell.svelte';
  import { formatDate } from '@/lib/duration-utils';
  import PreviewFileNavigation from './preview-file-navigation.svelte';
  import { cn, triggerFileDownload } from '@/lib/utils';
  import FilePreviewRemote from './file-preview-remote.svelte';
  import { invalidateAll } from '$app/navigation';

  let {
    open = $bindable(),
    document,
    onEdit,
    onCloseComplete
  }: {
    open: boolean;
    document?: RowMeta<Document>;
    onEdit?: () => void;
    onCloseComplete?: () => void;
  } = $props();

  let selectedFile = $state(document?.files[0]);
  $effect(() => {
    selectedFile = document?.files[0];
  });

  let zoomedIn = $state(false);

  const handleDownloadFile = $derived((filename: string) => {
    if (!document) return;
    const publicFileUrl = getDocumentFilePublicUrl(document, filename);
    return triggerFileDownload(publicFileUrl, filename);
  });
</script>

<Sheet.Root
  {open}
  onOpenChange={(newState) => {
    open = newState;
  }}
>
  <Sheet.Content
    showClose={false}
    class="w-full sm:max-w-2xl sm:rounded-lg"
    onoutroend={onCloseComplete}
  >
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
          onFileDelete={(fileName) => {
            document?.id && deleteFileFromDocument(document?.id, fileName);
            invalidateAll();
          }}
          onFileDownload={(fileName) => handleDownloadFile(fileName)}
        />
      {/if}
    </Sheet.Header>
    <Sheet.Body class="overflow-y-auto">
      <div class="flex flex-col p-6">
        <Sheet.Title class="text-xl">
          {document?.reference || '-'}
        </Sheet.Title>
        <Sheet.Description>
          {document?.supplier || '-'}
        </Sheet.Description>
      </div>
      <div class="flex flex-col gap-4 px-6">
        <ReadonlyField label="Issue date">
          {#if document?.issueDate}
            {formatDate(document.issueDate)}
          {/if}
        </ReadonlyField>
        <ReadonlyField label="Valid until">
          {#if document}
            <ValidUntilCell {document} />
          {/if}
        </ReadonlyField>
      </div>
    </Sheet.Body>
    <Sheet.Footer class="flex border-t p-6 sm:justify-between">
      {#if onEdit}
        <Button variant="default" onclick={onEdit}>
          <PencilIcon class="mr-2 h-4 w-4" />
          Edit
        </Button>
      {:else}
        <div></div>
      {/if}
      <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
