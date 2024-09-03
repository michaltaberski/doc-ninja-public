<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import * as Card from '$lib/components/ui/card';
  import AuthGuard from '@/lib/components/auth-guard.svelte';
  import { addFilesToDocument, logout, saveDocument } from '@/pb/index.js';
  import Logo from './doc-ninja-logo-2.svg';
  import {
    Home,
    LineChart,
    Package,
    ShoppingCart,
    CircleUser,
    Bell,
    Users,
    Package2
  } from 'lucide-svelte';
  import { fileDrop } from './file-drop-action';
  import SmartDialog from './smart-dialog.svelte';
  import NewDocumentSheet from '@/lib/components/document-sheet/new-document-sheet.svelte';
  import { Badge } from '@/lib/components/ui/badge';

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
    <div
      class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
    >
      <div class="bg-muted/40 hidden border-r md:block">
        <div class="flex h-full max-h-screen flex-col gap-2">
          <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" class="flex items-center gap-2 text-lg font-semibold">
              <img src={Logo} alt="DocNinja" class="h-8 w-8 transition hover:scale-110" />
              DocNinja
            </a>
            <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
              <Bell class="h-4 w-4" />
              <span class="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div class="flex-1">
            <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
              <a
                href="##"
                class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Home class="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <ShoppingCart class="h-4 w-4" />
                Orders
                <Badge
                  class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                >
                  6
                </Badge>
              </a>
              <a
                href="##"
                class="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Package class="h-4 w-4" />
                Products
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <Users class="h-4 w-4" />
                Customers
              </a>
              <a
                href="##"
                class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
              >
                <LineChart class="h-4 w-4" />
                Analytics
              </a>
            </nav>
          </div>
          <div class="mt-auto p-4">
            <Card.Root
              data-x-chunk-name="dashboard-02-chunk-0"
              data-x-chunk-description="A card with a call to action"
            >
              <Card.Header class="p-2 pt-0 md:p-4">
                <Card.Title>Upgrade to Pro</Card.Title>
                <Card.Description>
                  Unlock all features and get unlimited access to our support team.
                </Card.Description>
              </Card.Header>
              <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" class="w-full">Upgrade</Button>
              </Card.Content>
            </Card.Root>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <header
          class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6"
        >
          <div class="w-full flex-1">
            <form>search</form>
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
              <Button
                builders={[builder]}
                variant="secondary"
                size="icon"
                class="rounded-full"
              >
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
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
        <!-- <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div class="flex items-center">
            <h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div>
        </main> -->
      </div>
    </div>
  </div>
</AuthGuard>
