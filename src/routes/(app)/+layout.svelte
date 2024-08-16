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
    PanelLeft
  } from 'lucide-svelte';
  import Sidebar from './sidebar.svelte';
  import { fileDrop } from './file-drop-action';
  import SmartDialog from './smart-dialog.svelte';

  const { data } = $props();

  let open = $state(false);
</script>

<AuthGuard currentUser={data.currentUser}>
  <div
    class="flex min-h-screen w-full flex-col bg-muted/40"
    use:fileDrop={{
      onDragEnter: () => {
        open = true;
      },
      onDragLeave: () => {
        open = false;
      },
      onDrop: (files) => {
        open = false;
        console.log('dropped ', files);
      }
    }}
  >
    <SmartDialog bind:open />
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
