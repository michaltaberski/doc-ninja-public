import { type Document, type RowMeta } from './types';

export const getDocumentFilePublicUrl = (
  document: RowMeta<Document>,
  file: string
): string =>
  ['https://db.doc.ninja/api/files', document?.collectionId, document?.id, file].join(
    '/'
  );
