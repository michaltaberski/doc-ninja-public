export type RowMeta<T> = {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
} & T;
