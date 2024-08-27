import type { CalendarDate } from '@internationalized/date';

export type RowMeta<T = object> = {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
} & T;

export type Document = {
  files: string[];
  supplier?: string;
  reference?: string;
  issueDate?: CalendarDate;
  validityPeriod?: Duration;
  owner: string;
};

export type NewDocument = Omit<Document, 'files'> & {
  files: File[];
};

export type DurationUnit = 'DAY' | 'MONTH' | 'YEAR';
export type Duration = `${string}-${DurationUnit}`;
