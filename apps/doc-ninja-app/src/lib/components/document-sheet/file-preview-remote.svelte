<script lang="ts">
  import type { Document, FileType, RowMeta } from '@/pb/types';
  import FilePreviewSrc from './file-preview-src.svelte';
  import { getDocumentFilePublicUrl } from '@/pb/document-utils';
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
