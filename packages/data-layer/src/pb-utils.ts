import { parseDate } from '@internationalized/date';
import type { RecordModel } from 'pocketbase';
import type { RowMeta, Document } from './types';

export const transformDate = (date: string) => {
  return date ? parseDate(date.substr(0, 10)) : null;
};

export const transformDocument = (document: RecordModel) => {
  return {
    ...document,
    issueDate: transformDate(document.issueDate),
    deletedDate: transformDate(document.deletedDate)
  } as RowMeta<Document>;
};
