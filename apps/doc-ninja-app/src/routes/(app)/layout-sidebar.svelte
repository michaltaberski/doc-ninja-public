<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import Logo from './doc-ninja-logo-2.svg';
  import { Home, LineChart, Package, ShoppingCart, Bell, Users } from 'lucide-svelte';
  import { Badge } from '@/lib/components/ui/badge';
</script>

<aside class="bg-muted/40 hidden border-r md:block">
  <div class="flex h-full max-h-screen flex-col gap-2">
    <div class="flex h-[60px] min-h-[60px] items-center border-b px-4 lg:px-6">
      <a href="/" class="flex items-center gap-2 text-lg font-semibold">
        <img src={Logo} alt="DocNinja" class="h-8 w-8 transition hover:scale-110" />
        DocNinja
      </a>
      <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
        <Bell class="h-4 w-4" />
        <span class="sr-only">Toggle notifications</span>
      </Button>
    </div>
    <div class="flex flex-1 flex-col justify-between overflow-y-auto">
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
</aside>
