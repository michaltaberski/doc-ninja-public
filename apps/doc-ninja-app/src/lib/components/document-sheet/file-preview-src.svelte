<script lang="ts">
  import type { FileType } from '@doc-ninja/data-layer';
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
      class="bg-background/20 text-muted-foreground flex h-32 items-center justify-center"
    >
      <span class="text-sm">File type not supported</span>
    </div>
  {/if}
</div>
