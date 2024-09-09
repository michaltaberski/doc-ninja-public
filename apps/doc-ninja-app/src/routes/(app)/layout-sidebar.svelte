<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import Logo from '@/assets/doc-ninja-logo.svg';
  import { page } from '$app/stores';

  import { Bell, Icon, FileTextIcon, InboxIcon, Trash2Icon } from 'lucide-svelte';
  import { Badge } from '@/lib/components/ui/badge';
  import type { ComponentType } from 'svelte';
  import { cn } from '@/lib/utils';
  import type { Document, RowMeta } from '@doc-ninja/data-layer';

  const {
    activeDocuments,
    deletedDocuments
  }: {
    activeDocuments: RowMeta<Document>[];
    deletedDocuments: RowMeta<Document>[];
  } = $props();

  type Route = {
    label: string;
    href: string;
    badge?: number;
    icon: ComponentType<Icon>;
  };

  const routes: Route[] = $derived([
    {
      label: 'Documents',
      href: '/',
      badge: activeDocuments.length,
      icon: FileTextIcon
    },
    {
      label: 'Inbox',
      href: '/inbox',
      icon: InboxIcon
    },
    {
      label: 'Trash',
      href: '/trash',
      badge: deletedDocuments.length,
      icon: Trash2Icon
    }
  ]);
</script>

{#snippet routeLink(route: Route)}
  <a
    href={route.href}
    class={cn(
      'text-muted-foreground hover:text-primary group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-slate-300/20',
      {
        'text-primary hover:text-primary bg-slate-300/40 hover:bg-slate-300/50':
          route.href === $page.url.pathname
      }
    )}
  >
    <!-- <svelte:component
      this={route.icon}
      class="size-4 group-hover:scale-110"
      aria-hidden="true"
    /> -->
    {route.label}
    {#if route.badge}
      <Badge
        class="ml-auto flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full"
      >
        {route.badge}
      </Badge>
    {/if}
  </a>
{/snippet}

<aside class="bg-muted/40 hidden border-r md:block">
  <div class="flex h-full max-h-screen flex-col gap-2">
    <div class="flex h-[60px] min-h-[60px] items-center border-b px-4 lg:px-6">
      <a href="/" class="group flex items-center gap-2 text-lg font-semibold">
        <img src={Logo} alt="DocNinja" class="h-8 w-8 transition group-hover:scale-110" />
        DocNinja
      </a>
      <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
        <Bell class="h-4 w-4" />
        <span class="sr-only">Toggle notifications</span>
      </Button>
    </div>
    <div class="flex flex-1 flex-col justify-between overflow-y-auto">
      <div class="flex-1">
        <nav class="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
          {#each routes as route}
            {@render routeLink(route)}
          {/each}
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
</aside>
