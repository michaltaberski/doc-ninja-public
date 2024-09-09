<script lang="ts">
  import * as Select from '$lib/components/ui/select';
  import type { Document, RowMeta } from '@doc-ninja/data-layer';

  let {
    selectedId = $bindable(),
    documents
  }: { documents: RowMeta<Document>[]; selectedId?: string } = $props();
  const selectedDocument = $derived(documents?.find(({ id }) => id === selectedId));

  const getOptionLabel = (document: RowMeta<Document>) =>
    document.reference || '-' + ' (' + document.supplier + ')';

  const selectedOption = $derived(
    selectedDocument
      ? { value: selectedDocument.id, label: getOptionLabel(selectedDocument) }
      : undefined
  );
</script>

<Select.Root
  selected={selectedOption}
  onSelectedChange={(option) => {
    selectedId = option?.value;
  }}
>
  <Select.Trigger class="flex-[1]">
    <Select.Value placeholder="Select document" />
  </Select.Trigger>
  <Select.Content class="max-h-52 overflow-auto">
    {#each documents as document}
      <Select.Item value={document.id}>{getOptionLabel(document)}</Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
