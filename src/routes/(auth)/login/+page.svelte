<script>
  import { goto, invalidateAll } from '$app/navigation';
  import { Button } from '@/lib/components/ui/button';
  import * as Card from '@/lib/components/ui/card';
  import { Input } from '@/lib/components/ui/input';
  import { Label } from '@/lib/components/ui/label';
  import { login } from '@/pb';

  const { data } = $props();

  const formState = $state({
    userNameOrEmail: '',
    password: ''
  });

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
        <Card.Description>Enter your email below to login to your account.</Card.Description>
        <Card.Description>
          {formState.userNameOrEmail}
        </Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <div class="grid gap-2">
          <Label for="userNameOrEmail">Username or email</Label>
          <Input id="userNameOrEmail" required bind:value={formState.userNameOrEmail} />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" required bind:value={formState.password} />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button
          class="w-full"
          onclick={async () => {
            await login('michal', 'taberski123');
            invalidateAll();
          }}>Sign in</Button
        >
      </Card.Footer>
    </Card.Root>
  </div>
{:else}
  <div class="flex h-full items-center justify-center">
    <p class="text-lg font-semibold text-muted-foreground">Loading...</p>
  </div>
{/if}
