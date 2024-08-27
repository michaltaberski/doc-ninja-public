import type { Duration, DurationUnit } from '@/pb/types';

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
      return 'Day' + pluralSuffix;
    case 'MONTH':
      return 'Month' + pluralSuffix;
    case 'YEAR':
      return 'Year' + pluralSuffix;
  }
};
