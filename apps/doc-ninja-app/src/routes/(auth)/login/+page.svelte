<script>
  import { goto, invalidateAll } from '$app/navigation';
  import { Button } from '@/lib/components/ui/button';
  import * as Card from '@/lib/components/ui/card';
  import { Input } from '@/lib/components/ui/input';
  import { Label } from '@/lib/components/ui/label';
  import { createForm } from './create-form.svelte';
  import { cn } from '@/lib/utils';
  import { Loader } from 'lucide-svelte';
  import { login } from '@doc-ninja/data-layer';

  const { data } = $props();

  const form = createForm(
    { userNameOrEmail: '', password: '' },
    {
      onSubmit: async ({ userNameOrEmail, password }) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await login(userNameOrEmail, password);
        await invalidateAll();
      }
    }
  );

  let isLoaded = $state(false);
  $effect(() => {
    data.currentUser ? goto('/') : (isLoaded = true);
  });
</script>

{#if isLoaded}
  <div class="flex h-screen w-full items-center justify-center px-4">
    <Card.Root class="w-full max-w-sm">
      <Card.Header>
        <Card.Title class="text-2xl">Login</Card.Title>
        <Card.Description
          >Enter your email below to login to your account.</Card.Description
        >
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class="grid gap-2">
          <Label for="userNameOrEmail">Username or email</Label>
          <Input
            id="userNameOrEmail"
            required
            bind:value={form.state.userNameOrEmail}
            disabled={form.formMeta.isSubmitting}
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            bind:value={form.state.password}
            disabled={form.formMeta.isSubmitting}
          />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button
          class="relative w-full"
          onclick={form.handleSubmit}
          disabled={form.formMeta.isSubmitting}
        >
          <span class={cn(form.formMeta.isSubmitting && 'hidden')}>Sign in</span>
          <Loader class={cn('animate-spin', !form.formMeta.isSubmitting && 'hidden')} />
        </Button>
      </Card.Footer>
    </Card.Root>
  </div>
{:else}
  <div class="flex h-full items-center justify-center">
    <p class="text-muted-foreground text-lg font-semibold">Loading...</p>
  </div>
{/if}
