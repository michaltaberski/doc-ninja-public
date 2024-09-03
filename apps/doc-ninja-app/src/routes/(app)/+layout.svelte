<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Sheet from '$lib/components/ui/sheet';
  import AuthGuard from '@/lib/components/auth-guard.svelte';
  import { addFilesToDocument, logout, saveDocument } from '@/pb/index.js';
  import {
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    UsersRound,
    PanelLeft
  } from 'lucide-svelte';
  import Sidebar from './sidebar.svelte';
  import { fileDrop } from './file-drop-action';
  import SmartDialog from './smart-dialog.svelte';
  import NewDocumentSheet from '@/lib/components/document-sheet/new-document-sheet.svelte';

  const { data, children } = $props();

  let open = $state(false);
  let openTray = $state(false);
  let droppedFiles = $state<FileList | null>(null);
</script>

<AuthGuard currentUser={data.currentUser}>
  <div
    class="bg-muted/40 flex min-h-screen w-full flex-col"
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

    <NewDocumentSheet
      open={openTray}
      fileList={droppedFiles || undefined}
      onCancel={() => {
        openTray = false;
        droppedFiles = null;
      }}
      onCreateNew={async (documentProps) => {
        if (data.currentUser) {
          await saveDocument({ ...documentProps, owner: data.currentUser.id });
          await invalidateAll();
        }
      }}
      onAddFilesToDocument={async (documentId, files) => {
        if (data.currentUser) {
          await addFilesToDocument(documentId, files);
          await invalidateAll();
        }
      }}
    />
    <Sidebar />
    <div class="flex flex-col pt-[72px] sm:gap-4 sm:pb-4 sm:pl-14">
      <header
        class="bg-background fixed left-14 right-0 top-0 z-10 flex h-[57px] items-center justify-between gap-1 border-b px-4"
      >
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-semibold">DocNinja</h1>
          {openTray ? 'nd opened' : 'nd closed'}
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
                  class="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
                >
                  <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                  <span class="sr-only">Acme Inc</span>
                </a>
                <a
                  href="/"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  <Home class="h-5 w-5" />
                  Dashboard
                </a>
                <a href="/" class="text-foreground flex items-center gap-4 px-2.5">
                  <ShoppingCart class="h-5 w-5" />
                  Orders
                </a>
                <a
                  href="/"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  <Package class="h-5 w-5" />
                  Products
                </a>
                <a
                  href="/"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
                >
                  <UsersRound class="h-5 w-5" />
                  Customers
                </a>
                <a
                  href="/"
                  class="text-muted-foreground hover:text-foreground flex items-center gap-4 px-2.5"
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
              <div class="bg-primary h-9 w-9 overflow-hidden rounded-full"></div>
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

      {@render children()}
    </div>
  </div>
</AuthGuard>
