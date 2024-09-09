<script lang="ts">
  import * as Select from '$lib/components/ui/select';
  import type { Duration, DurationUnit } from '@doc-ninja/data-layer';
  import { times } from 'lodash';
  import { DURATION_UNITS, getDurationUnitLabel } from '../duration-utils';

  const durations = times(30, (i) => `${i + 1}`);

  let { duration = $bindable() }: { duration?: Duration } = $props();

  const [count, unit] = $derived(
    (duration || '-').split('-') as [string?, DurationUnit?]
  );

  let selectedCount = $state(count);
  let selectedUnit = $state(unit);

  $effect(() => {
    duration =
      selectedCount && selectedUnit ? `${selectedCount}-${selectedUnit}` : undefined;
  });
</script>

<div class="flex gap-2">
  <Select.Root
    selected={count ? { value: count, label: count } : undefined}
    onSelectedChange={(option) => {
      if (option) selectedCount = option.value;
    }}
  >
    <Select.Trigger class="flex-[1]">
      <Select.Value />
    </Select.Trigger>
    <Select.Content class="max-h-52 overflow-auto">
      {#each durations as durationOption}
        <Select.Item value={durationOption}>{durationOption}</Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
  <Select.Root
    selected={unit
      ? {
          value: unit,
          label: getDurationUnitLabel(`${selectedCount || '1'}-${unit}`)
        }
      : undefined}
    onSelectedChange={(option) => {
      if (option) selectedUnit = option.value;
    }}
  >
    <Select.Trigger class="flex-[3]">
      <Select.Value />
    </Select.Trigger>
    <Select.Content class="max-h-52 overflow-auto">
      {#each DURATION_UNITS as unitOption}
        <Select.Item value={unitOption}>
          {getDurationUnitLabel(`${selectedCount || '1'}-${unitOption}`)}
        </Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
