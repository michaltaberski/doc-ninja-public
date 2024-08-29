<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import * as Select from '$lib/components/ui/select';
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DownloadIcon,
    PencilIcon
  } from 'lucide-svelte';
  import type { Document, RowMeta } from '@/pb/types';
  import ReadonlyField from '../readonly-field.svelte';
  import FilePreview from './file-preview.svelte';
  import ValidUntilCell from '../valid-until-cell.svelte';
  import { formatDate } from '@/lib/duration-utils';
  import PreviewFileNavigation from './preview-file-navigation.svelte';

  let {
    open = $bindable(),
    document,
    onEdit
  }: {
    open?: boolean;
    document?: RowMeta<Document>;
    onEdit?: () => void;
  } = $props();

  let selectedFile = $state(document?.files[0]);
  $effect(() => {
    selectedFile = document?.files[0];
  });
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header class="relative">
      {#if document && selectedFile}
        <FilePreview {document} file={selectedFile} class="h-96 max-h-96" />
      {/if}
      {#if selectedFile}
        <PreviewFileNavigation
          bind:currentFile={selectedFile}
          files={document?.files || []}
        />
      {/if}
    </Sheet.Header>
    <Sheet.Body>
      <div class="flex flex-col p-6">
        <Sheet.Title class="text-2xl">
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
      <Button variant="default" onclick={onEdit}>
        <PencilIcon class="mr-2 h-4 w-4" />
        Edit
      </Button>
      <Button variant="outline" onclick={() => (open = false)}>Cancel</Button>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
