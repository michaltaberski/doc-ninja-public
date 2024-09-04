<script lang="ts" generics="T">
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import {
    ChevronLeftIcon,
    ChevronRightIcon,
    EllipsisIcon,
    ZoomInIcon,
    ZoomOutIcon
  } from 'lucide-svelte';

  let {
    currentFile = $bindable(),
    zoomedIn = $bindable(),
    files,
    getFileName = (file: T) => file?.toString() || '-',
    onFileDelete,
    onFileDownload
  }: {
    currentFile: T;
    zoomedIn: boolean;
    files: T[];
    getFileName?: (file: T) => string;
    onFileDelete?: (fileName: string) => void;
    onFileDownload?: (file: T) => void;
  } = $props();

  const currentFileIndex = $derived(files.indexOf(currentFile));
</script>

<div
  class="bg-background/80 absolute bottom-0 flex w-full items-center justify-between border-b px-4 py-2 backdrop-blur-md"
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
    <span class="text-muted-foreground text-sm">{getFileName(currentFile)}</span>
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button size="icon" variant="outline" builders={[builder]}>
          <EllipsisIcon class="h-4 w-4" />
          <span class="sr-only">Menu</span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#if onFileDelete}
          <DropdownMenu.Item
            class="text-red-600 data-[highlighted]:text-red-500"
            onclick={() => onFileDelete(getFileName(currentFile))}
          >
            Delete
          </DropdownMenu.Item>
        {/if}
        {#if onFileDownload}
          <DropdownMenu.Item onclick={() => onFileDownload(currentFile)}>
            Download
          </DropdownMenu.Item>
        {/if}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
</div>
