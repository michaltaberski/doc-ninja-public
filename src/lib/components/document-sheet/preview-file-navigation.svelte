<script lang="ts" generics="T">
  import { Button } from '$lib/components/ui/button';
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DownloadIcon,
    ZoomInIcon,
    ZoomOutIcon
  } from 'lucide-svelte';

  let {
    currentFile = $bindable(),
    zoomedIn = $bindable(),
    files
  }: {
    currentFile: T;
    zoomedIn: boolean;
    files: T[];
  } = $props();

  const currentFileIndex = $derived(files.indexOf(currentFile));
</script>

<div
  class="absolute bottom-0 flex w-full items-center justify-between border-b bg-background/80 px-4 py-2 backdrop-blur-md"
>
  <div class="flex items-center gap-2">
    {#if files.length > 1}
      <Button
        size="icon"
        variant="outline"
        onclick={() => {
          currentFile = files[currentFileIndex - 1];
        }}
        disabled={currentFileIndex === 0}
      >
        <ChevronLeftIcon class="h-4 w-4" />
        <span class="sr-only">Previous File</span>
      </Button>
      <Button
        size="icon"
        variant="outline"
        onclick={() => {
          currentFile = files[currentFileIndex + 1];
        }}
        disabled={currentFileIndex === files.length - 1}
      >
        <ChevronRightIcon class="h-4 w-4" />
        <span class="sr-only">Previous File</span>
      </Button>
    {/if}
    <span class="text-sm text-muted-foreground">{currentFile}</span>
  </div>
  <div class="flex items-center gap-2">
    {#if zoomedIn}
      <Button size="icon" variant="outline" onclick={() => (zoomedIn = false)}>
        <ZoomOutIcon class="h-4 w-4" />
        <span class="sr-only">Zoom out</span>
      </Button>
    {:else}
      <Button size="icon" variant="outline" onclick={() => (zoomedIn = true)}>
        <ZoomInIcon class="h-4 w-4" />
        <span class="sr-only">Zoom in</span>
      </Button>
    {/if}
    <Button size="icon" variant="outline">
      <DownloadIcon class="h-4 w-4" />
      <span class="sr-only">Download PDF</span>
    </Button>
  </div>
</div>
