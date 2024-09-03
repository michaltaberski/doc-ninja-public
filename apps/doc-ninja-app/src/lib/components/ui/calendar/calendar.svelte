<script lang="ts">
  import { Calendar as CalendarPrimitive } from 'bits-ui';
  import * as Calendar from './index.js';
  import { cn } from '$lib/utils.js';
  import { toCalendarDate, type CalendarDate } from '@internationalized/date';

  type $$Props = Omit<CalendarPrimitive.Props, 'value'> & {
    value: CalendarDate | undefined;
  };

  type $$Events = CalendarPrimitive.Events;

  let {
    value = $bindable(),
    placeholder = $bindable(),
    weekdayFormat = 'short',
    class: className,
    ...restProps
  }: $$Props = $props();
</script>

<CalendarPrimitive.Root
  {value}
  onValueChange={(newValue) => (value = newValue ? toCalendarDate(newValue) : undefined)}
  bind:placeholder
  {weekdayFormat}
  class={cn('p-3', className)}
  {...restProps}
  on:keydown
  let:months
  let:weekdays
>
  <Calendar.Header>
    <Calendar.PrevButton />
    <Calendar.Heading />
    <Calendar.NextButton />
  </Calendar.Header>
  <Calendar.Months>
    {#each months as month}
      <Calendar.Grid>
        <Calendar.GridHead>
          <Calendar.GridRow class="flex">
            {#each weekdays as weekday}
              <Calendar.HeadCell>
                {weekday.slice(0, 2)}
              </Calendar.HeadCell>
            {/each}
          </Calendar.GridRow>
        </Calendar.GridHead>
        <Calendar.GridBody>
          {#each month.weeks as weekDates}
            <Calendar.GridRow class="mt-2 w-full">
              {#each weekDates as date}
                <Calendar.Cell {date}>
                  <Calendar.Day {date} month={month.value} />
                </Calendar.Cell>
              {/each}
            </Calendar.GridRow>
          {/each}
        </Calendar.GridBody>
      </Calendar.Grid>
    {/each}
  </Calendar.Months>
</CalendarPrimitive.Root>
