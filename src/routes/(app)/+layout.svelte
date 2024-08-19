<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Sheet from '$lib/components/ui/sheet';
  import AuthGuard from '@/lib/components/auth-guard.svelte';
  import { logout } from '@/pb/index.js';
  import {
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    UsersRound,
    PanelLeft,
    DownloadIcon,
    ChevronRightIcon,
    ChevronLeftIcon
  } from 'lucide-svelte';
  import Sidebar from './sidebar.svelte';
  import { fileDrop } from './file-drop-action';
  import SmartDialog from './smart-dialog.svelte';
  import FilePreview from './file-preview.svelte';
  import { Input } from '@/lib/components/ui/input';
  import FormFiled from '@/lib/components/form-filed.svelte';
  import * as Dialog from '@/lib/components/ui/dialog';

  const { data } = $props();

  let open = $state(false);
  let openTray = $state(false);
  let droppedFiles = $state<FileList | null>(null);
</script>

<AuthGuard currentUser={data.currentUser}>
  <div
    class="flex min-h-screen w-full flex-col bg-muted/40"
    use:fileDrop={{
      onDragEnter: () => {
        open = true;
        droppedFiles = null;
      },
      onDragLeave: () => {
        open = false;
      },
      onDrop: async (files) => {
        open = false;
        droppedFiles = files;
        await new Promise((r) => setTimeout(r, 400));
        openTray = true;
      }
    }}
  >
    <SmartDialog bind:open />

    <Sheet.Root open={openTray} onOpenChange={(newState) => (openTray = newState)}>
      <Sheet.Content showClose={false} class="w-full sm:max-w-2xl sm:rounded-lg">
        <Sheet.Header class="relative">
          <div class="flex max-h-96 border-b">
            {#each [...(droppedFiles || [])] as file}
              <FilePreview {file} class="object-contain" />
            {/each}
          </div>
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
              <!-- <Slider
                class="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-muted-foreground [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-primary [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                defaultValue={[50]}
                max={100}
                min={10}
                step={10}
                aria-label="Zoom"
              /> -->
              <Button size="icon" variant="outline" onclick={() => (open = true)}>
                <DownloadIcon class="h-4 w-4" />
                <span class="sr-only">Download PDF</span>
              </Button>

              <Dialog.Root portal={document.body}>
                <Dialog.Trigger>Edit</Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                  <Dialog.Header>
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description>
                      Make changes to your profile here. Click save when you're done.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Input id="name" value="Pedro Duarte" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Input id="username" value="@peduarte" class="col-span-3" />
                    </div>
                  </div>
                  <Dialog.Footer>
                    <Button type="submit">Save changes</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        </Sheet.Header>
        <Sheet.Body>
          <div class="flex flex-col p-6">
            <Sheet.Title class="text-2xl">New Document</Sheet.Title>
            <Sheet.Description>
              Fill out the form to add a new document to the library.
            </Sheet.Description>
          </div>
          <div class="flex flex-col gap-4 px-6">
            <FormFiled label="Suplier" for="suplier">
              <Input id="suplier" />
            </FormFiled>
            <FormFiled label="Reference" for="reference">
              <Input id="reference" />
            </FormFiled>
            <div class="flex gap-6">
              <FormFiled label="Date" for="date">
                <Input id="date" />
              </FormFiled>
              <FormFiled label="Validity period" for="validity-period">
                <Input id="validity-period" />
              </FormFiled>
            </div>
          </div>
        </Sheet.Body>
        <Sheet.Footer class="border-t p-6">
          <Button
            variant="outline"
            onclick={() => {
              openTray = false;
              droppedFiles = null;
            }}
          >
            Cancel
          </Button>
          <Button>Save</Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
    <Sidebar />
    <div class="flex flex-col pt-[72px] sm:gap-4 sm:pb-4 sm:pl-14">
      <header
        class="fixed left-14 right-0 top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b bg-background px-4"
      >
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-semibold">DocNinja</h1>
          <Sheet.Root>
            <Sheet.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                size="icon"
                variant="outline"
                class="sm:hidden"
              >
                <PanelLeft class="h-5 w-5" />
                <span class="sr-only">Toggle Menu</span>
              </Button>
            </Sheet.Trigger>
            <Sheet.Content side="left" class="sm:max-w-xs">
              <nav class="grid gap-6 text-lg font-medium">
                <a
                  href="/"
                  class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                  <span class="sr-only">Acme Inc</span>
                </a>
                <a
                  href="/"
                  class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home class="h-5 w-5" />
                  Dashboard
                </a>
                <a href="/" class="flex items-center gap-4 px-2.5 text-foreground">
                  <ShoppingCart class="h-5 w-5" />
                  Orders
                </a>
                <a
                  href="/"
                  class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package class="h-5 w-5" />
                  Products
                </a>
                <a
                  href="/"
                  class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <UsersRound class="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="/"
                  class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart class="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </Sheet.Content>
          </Sheet.Root>
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              variant="outline"
              size="icon"
              class="overflow-hidden rounded-full"
              builders={[builder]}
            >
              <div class="h-9 w-9 overflow-hidden rounded-full bg-primary"></div>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onclick={() => {
                logout();
                invalidateAll();
              }}>Logout</DropdownMenu.Item
            >
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </header>

      <slot />
    </div>
  </div>
</AuthGuard>
