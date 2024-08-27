<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import { DownloadIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-svelte';
  import LocalFilePreview from './local-file-preview.svelte';
  import type { NewDocument } from '@/pb/types';
  import DocumentForm from './document-form.svelte';
  import { today } from '@internationalized/date';

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

  let isSaving = $state(false);
  const handleSave = async () => {
    isSaving = true;
    documentProps.files = [...(fileList || [])];
    await onSave?.(documentProps);
    isSaving = false;
    onCancel?.();
  };
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header class="relative">
      <div class="flex max-h-96 border-b">
        {#each [...(fileList || [])] as file}
          <LocalFilePreview {file} class="object-contain" />
        {/each}
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between border-b bg-background/40 px-4 py-2 backdrop-blur-md"
      >
        <div class="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeftIcon class="h-4 w-4" />
            <span class="sr-only">Previous Page</span>
          </Button>
          <Button size="icon" variant="outline">
            <ChevronRightIcon class="h-4 w-4" />
            <span class="sr-only">Next Page</span>
          </Button>
          <span class="text-sm text-muted-foreground">Page 1 of 10</span>
        </div>
        <div class="flex items-center gap-2">
          <!--
          <Slider
            class="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted-foreground [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
            defaultValue={[50]}
            max={100}
            min={10}
            step={10}
            aria-label="Zoom"
          />
          -->
          <Button size="icon" variant="outline" onclick={onCancel}>
            <DownloadIcon class="h-4 w-4" />
            <span class="sr-only">Download PDF</span>
          </Button>
        </div>
      </div>
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
