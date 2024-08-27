<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Sheet from '$lib/components/ui/sheet';
  import {
    DownloadIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
    PencilIcon
  } from 'lucide-svelte';
  import type { Document, RowMeta } from '@/pb/types';
  import ReadonlyField from '../readonly-field.svelte';

  let {
    open = $bindable(),
    document,
    onEdit,
    onCancel
  }: {
    open?: boolean;
    document?: RowMeta<Document>;
    onCancel?: () => void;
    onEdit?: () => void;
  } = $props();

  const fileUrls = $derived(
    (document?.files || []).map((fileName) =>
      [
        'https://db.doc.ninja/api/files',
        document?.collectionId,
        document?.id,
        fileName
      ].join('/')
    )
  );
</script>

<Sheet.Root {open} onOpenChange={(newState) => (open = newState)}>
  <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
    <Sheet.Header class="relative">
      <div class="flex max-h-96 min-h-80 border-b">
        {#each fileUrls as fileUrl}
          <img src={fileUrl} class="object-contain" />
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
          <Button size="icon" variant="outline" onclick={onCancel}>
            <DownloadIcon class="h-4 w-4" />
            <span class="sr-only">Download PDF</span>
          </Button>
        </div>
      </div>
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
      <div class="flex flex-col gap-4 px-6">
        <ReadonlyField label="Issue date">{document?.issueDate}</ReadonlyField>
        <ReadonlyField label="Validity period"
          >{document?.validityPeriod || '-'}</ReadonlyField
        >
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
