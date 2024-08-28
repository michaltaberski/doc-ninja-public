<script lang="ts">
  import { cn } from '@/lib/utils';
  import { PdfViewer } from 'svelte-pdf-simple';
  import { Button } from '../ui/button';
  import { ChevronLeftIcon, ChevronRightIcon, DownloadIcon } from 'lucide-svelte';
  const { src, class: className }: { src: string; class?: string } = $props();

  let pdfViewer: PdfViewer | undefined = $state();

  $inspect(pdfViewer);
</script>

<div class={cn('relative h-full', className)}>
  <PdfViewer
    bind:this={pdfViewer}
    props={{ url: src, scale: 2 }}
    class={'mx-auto max-h-[100%] max-w-[100%] object-contain'}
  />
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
      <Button size="icon" variant="outline">
        <DownloadIcon class="h-4 w-4" />
        <span class="sr-only">Download PDF</span>
      </Button>
    </div>
  </div>
</div>
