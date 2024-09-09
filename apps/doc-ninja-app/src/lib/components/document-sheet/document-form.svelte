<script lang="ts">
  import { Input } from '@/lib/components/ui/input';
  import FormFiled from '@/lib/components/form-filed.svelte';
  import type { Document } from '@doc-ninja/data-layer';
  import DatePicker from '../ui/date-picker.svelte';
  import DurationSelect from '../duration-select.svelte';
  import Autocomplete from '../ui/autocomplete.svelte';

  let {
    document = $bindable(),
    disabled
  }: {
    document: Pick<
      Document,
      'issueDate' | 'supplier' | 'reference' | 'issueDate' | 'validityPeriod'
    >;
    disabled?: boolean;
  } = $props();
</script>

<div class="flex flex-col gap-4 px-6">
  <FormFiled label="Supplier" for="supplier">
    <Input id="supplier" bind:value={document.supplier} {disabled} />
  </FormFiled>
  <div class="flex gap-6">
    <FormFiled label="Reference" for="reference">
      <Input id="reference" bind:value={document.reference} {disabled} />
    </FormFiled>
    <FormFiled label="Category">
      <Autocomplete options={[]} onCreate={() => {}} />
    </FormFiled>
  </div>
  <div class="flex gap-6">
    <FormFiled label="Issue date">
      <DatePicker bind:value={document.issueDate} class="w-auto" />
    </FormFiled>
    <FormFiled label="Validity period" for="validity-period">
      <DurationSelect bind:duration={document.validityPeriod} />
    </FormFiled>
  </div>
</div>
