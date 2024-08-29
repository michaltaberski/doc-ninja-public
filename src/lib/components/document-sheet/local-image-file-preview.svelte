<script lang="ts">
  const { file, class: className } = $props<{ file: File; class?: string }>();

  let imageSrc = $state<string | null | undefined>(null);
  $effect(() => {
    if (!file?.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      imageSrc = data as string;
    };
    reader.readAsDataURL(file);
  });
</script>

{#if file.type.startsWith('image/')}
  {#if imageSrc}
    <img src={imageSrc} alt={file.name} class={className} />
  {:else}
    <p>Loading...</p>
  {/if}
{:else}
  <p>Preview not available</p>
{/if}
