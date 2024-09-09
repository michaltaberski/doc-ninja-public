<script lang="ts">
  import type { FileType } from '@doc-ninja/data-layer';
  import { cn, loadFileToSrc } from '@/lib/utils';
  import FilePreviewSrc from './file-preview-src.svelte';

  const { file, class: className }: { file: File; class?: string } = $props();

  const fileName = $derived(file.name);
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

{#await srcPromise}
  <div class={cn('border-b bg-gray-100', className)}></div>
{:then src}
  <FilePreviewSrc {src} {fileType} {fileName} class={className} />
{/await}
