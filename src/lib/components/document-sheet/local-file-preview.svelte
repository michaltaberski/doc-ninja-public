<script lang="ts">
  import type { FileType } from '@/pb/types';
  import LocalImageFilePreview from './local-image-file-preview.svelte';
  import { cn } from '@/lib/utils';
  import PdfPreview from './pdf-preview.svelte';

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
</script>

<div class={cn('border-b bg-gray-100', className)}>
  {#if fileType === 'Image'}
    <LocalImageFilePreview {file} class="mx-auto h-full object-contain" />
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
