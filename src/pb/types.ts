export type RowMeta<T> = {
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  updated: string;
} & T;

export type Document = {
  files: File[];
  supplier?: string;
  reference?: string;
  date?: string;
  validityPeriod?: string;
  owner: string;
};
