<script lang="ts">
  import type { FileType } from '@/pb/types';
  import { loadFileToSrc } from '@/lib/utils';
  import FilePreviewSrc from './file-preview-src.svelte';

  const { file, class: className }: { file: File; class?: string } = $props();

  const fileType: FileType = $derived.by(() => {
    const ext = file.name.split('.').pop() as string;
    if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(ext)) {
      return 'Image';
    }
    if (['pdf'].includes(ext)) {
      return 'PDF';
    }
    return 'File';
  });

  const srcPromise = $derived(loadFileToSrc(file));
</script>

{#await srcPromise then src}
  <FilePreviewSrc {src} {fileType} class={className} />
{/await}
