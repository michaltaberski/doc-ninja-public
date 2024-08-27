<script lang="ts">
  import type { Document, FileType, RowMeta } from '@/pb/types';
  import { PdfViewer } from 'svelte-pdf-simple';
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

{#if fileType === 'Image'}
  <img {src} alt={file} class={className} />
{:else if fileType === 'PDF'}
  <PdfViewer
    props={{ url: src, scale: 10 }}
    class="mx-auto max-w-[100%] object-contain"
  />
{:else}
  <div
    class="flex h-32 items-center justify-center bg-background/20 text-muted-foreground"
  >
    <span class="text-sm">File type not supported</span>
  </div>
{/if}
