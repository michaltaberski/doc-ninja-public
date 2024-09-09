<script lang="ts">
  import {
    getDocumentFilePublicUrl,
    type Document,
    type FileType,
    type RowMeta
  } from '@doc-ninja/data-layer';
  import FilePreviewSrc from './file-preview-src.svelte';
  const {
    document,
    file,
    class: className
  }: {
    document: RowMeta<Document>;
    file: string;
    class?: string;
  } = $props();

  const src = $derived(getDocumentFilePublicUrl(document, file));

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

<FilePreviewSrc {src} {fileType} fileName={file} class={className} />
