<script lang="ts">
  import type { Document, FileType, RowMeta } from '@/pb/types';
  import PdfPreview from './pdf-preview.svelte';
  import { cn } from '@/lib/utils';
  const {
    document,
    file,
    class: className
  }: {
    document: RowMeta<Document>;
    file: string;
    class?: string;
  } = $props();

  const src = $derived(
    ['https://db.doc.ninja/api/files', document?.collectionId, document?.id, file].join(
      '/'
    )
  );

  const fileType: FileType = $derived.by(() => {
    const ext = file.toLocaleLowerCase().split('.').pop() as string;
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) {
      return 'Image';
    }
    if (['pdf'].includes(ext)) {
      return 'PDF';
    }
    return 'File';
  });
</script>

<div class={cn('border-b', className)}>
  {#if fileType === 'Image'}
    <img {src} alt={file} class="mx-auto h-full object-contain" />
  {:else if fileType === 'PDF'}
    <PdfPreview {src} class="h-full" />
  {:else}
    <div
      class="flex h-32 items-center justify-center bg-background/20 text-muted-foreground"
    >
      <span class="text-sm">File type not supported</span>
    </div>
  {/if}
</div>
