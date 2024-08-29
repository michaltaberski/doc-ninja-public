<script lang="ts">
  import { cn } from '@/lib/utils';
  import { PdfViewer, type PdfLoadSuccess } from 'svelte-pdf-simple';
  import { Button } from '../ui/button';
  import {
    ChevronDown,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUp,
    DownloadIcon
  } from 'lucide-svelte';
  const { src, class: className }: { src: string; class?: string } = $props();

  let pdfViewer: PdfViewer | undefined = $state();

  let isLoaded = $state(false);
  let totalPages = $state(0);
  let pageNumber = $state(0);
  const hasNextPage = $derived(isLoaded && pageNumber < totalPages);
  const hasPrevPage = $derived(isLoaded && pageNumber > 1);

  const handleLoadedSuccess = (event: CustomEvent<PdfLoadSuccess>) => {
    isLoaded = true;
    totalPages = event.detail.totalPages;
    pageNumber = event.detail.pageNumber;
  };

  const handleLoadFailure = (event: CustomEvent) => {
    console.error('PDF failed to load', event.detail);
  };

  const handlePageChanged = (event: CustomEvent) => {
    console.log('Page changed', event.detail);
  };

  const navigatePages = (forward: boolean = false) => {
    console.log('Navigating pages', forward);
    forward
      ? pageNumber === totalPages
        ? (pageNumber = 1)
        : pageNumber++
      : pageNumber === 1
        ? (pageNumber = totalPages)
        : pageNumber--;
    pdfViewer?.goToPage(pageNumber);
  };
</script>

<div class={cn('relative bg-gray-100', className)}>
  <PdfViewer
    bind:this={pdfViewer}
    props={{ url: src, scale: 2 }}
    class={'mx-auto max-h-[100%] max-w-[100%] object-contain'}
    on:load_success={handleLoadedSuccess}
    on:load_failure={handleLoadFailure}
    on:page_changed={handlePageChanged}
  />
  <!-- START -->
  {#if isLoaded}
    <div class="absolute right-0 top-0 z-10 flex items-center justify-between px-4 py-2">
      <div class="mt-1 flex flex-col items-end gap-2">
        <div class="rounded bg-background px-2 py-0.5 text-xs text-muted-foreground">
          Page {pageNumber} of {totalPages}
        </div>
        <Button
          disabled={!hasPrevPage}
          size="icon"
          variant="outline"
          onclick={() => navigatePages(false)}
        >
          <ChevronUp class="h-4 w-4" />
          <span class="sr-only">Previous Page</span>
        </Button>
        <Button
          disabled={!hasNextPage}
          size="icon"
          variant="outline"
          onclick={() => navigatePages(true)}
        >
          <ChevronDown class="h-4 w-4" />
          <span class="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  {/if}
  <!-- END -->
  {#if isLoaded}
    <div
      class="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between bg-background/40 px-4 py-2 backdrop-blur-md"
    >
      <div class="flex items-center gap-2">
        <Button
          disabled={!hasPrevPage}
          size="icon"
          variant="outline"
          onclick={() => navigatePages(false)}
        >
          <ChevronLeftIcon class="h-4 w-4" />
          <span class="sr-only">Previous Page</span>
        </Button>
        <Button
          disabled={!hasNextPage}
          size="icon"
          variant="outline"
          onclick={() => navigatePages(true)}
        >
          <ChevronRightIcon class="h-4 w-4" />
          <span class="sr-only">Next Page</span>
        </Button>
        <span class="text-sm text-muted-foreground">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <DownloadIcon class="h-4 w-4" />
          <span class="sr-only">Download PDF</span>
        </Button>
      </div>
    </div>
  {/if}
</div>
