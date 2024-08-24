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
  date?: string;
  validityPeriod?: string;
  owner: string;
};

export type NewDocument = Omit<Document, 'files'> & {
  files: File[];
};
