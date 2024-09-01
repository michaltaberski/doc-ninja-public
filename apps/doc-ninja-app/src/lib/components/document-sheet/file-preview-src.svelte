<script lang="ts">
  import type { FileType } from '@/pb/types';
  import PdfPreview from './pdf-preview.svelte';
  import { cn } from '@/lib/utils';
  const {
    fileType,
    src,
    fileName,
    class: className
  }: {
    fileType: FileType;
    src: string;
    fileName: string;
    class?: string;
  } = $props();
</script>

<div class={cn('border-b bg-gray-100', className)}>
  {#if fileType === 'Image'}
    <img {src} alt={fileName} class="mx-auto h-full object-contain" />
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
