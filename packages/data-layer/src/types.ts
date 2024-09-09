import type { CalendarDate } from '@internationalized/date';

export type RowMeta<T = object> = {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
} & T;

export type DurationUnit = 'DAY' | 'MONTH' | 'YEAR';

export type Duration = `${string}-${DurationUnit}`;

export type FileType = 'Image' | 'PDF' | 'File';

// Collection items

export type Document = {
  files: string[];
  supplier?: string;
  reference?: string;
  issueDate?: CalendarDate;
  deletedDate?: CalendarDate;
  validityPeriod?: Duration;
  owner: string;
};

export type NewDocument = Omit<Document, 'files'> & {
  files: File[];
};

export type InboxItem = {
  meta: Object;
  files: string[];
};
