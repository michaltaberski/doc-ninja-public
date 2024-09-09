import type { Duration, DurationUnit, Document } from '@doc-ninja/data-layer';
import {
  DateFormatter,
  getLocalTimeZone,
  today,
  type CalendarDate,
  type DateDuration
} from '@internationalized/date';

export const DURATION_UNITS: DurationUnit[] = ['DAY', 'MONTH', 'YEAR'];

export const splitDuration = (duration?: Duration) => {
  const [countStr, unit] = (duration || '-').split('-') as [string, DurationUnit];
  const count = parseInt(countStr);
  if (isNaN(count)) return { count: undefined, unit: undefined };
  return { count, unit };
};

export const getDurationUnitLabel = (duration: Duration) => {
  const { count, unit } = splitDuration(duration);
  const pluralSuffix = count === 1 ? '' : 's';
  switch (unit) {
    case 'DAY':
      return 'day' + pluralSuffix;
    case 'MONTH':
      return 'month' + pluralSuffix;
    case 'YEAR':
      return 'year' + pluralSuffix;
  }
};

export const getFormattedDuration = (duration?: Duration) => {
  const { count } = splitDuration(duration);
  if (!duration || count === undefined) return '';
  return `${count} ${getDurationUnitLabel(duration)}`;
};

const durationToDateDuration = (duration?: Duration): DateDuration | null => {
  const { count, unit } = splitDuration(duration);
  if (count === undefined) return null;
  switch (unit) {
    case 'DAY':
      return { days: count };
    case 'MONTH':
      return { months: count };
    case 'YEAR':
      return { years: count };
  }
};

export const validUntil = ({
  validityPeriod,
  issueDate
}: Pick<Document, 'validityPeriod' | 'issueDate'>) => {
  const dateDuration = durationToDateDuration(validityPeriod);
  if (!dateDuration || !issueDate) return null;
  return issueDate.add(dateDuration);
};

export const formatDate = (
  date: CalendarDate,
  style: 'full' | 'long' | 'medium' | 'short' = 'medium'
) => {
  const df = new DateFormatter('en-US', { dateStyle: style });
  return df.format(date.toDate('UTC'));
};

export const getIsFutureDate = (date: CalendarDate) => {
  const todayDate = today(getLocalTimeZone());
  return date.compare(todayDate) > 0;
};
