import PocketBase from 'pocketbase';
import type { Document, DocumentFile, NewDocument, RowMeta } from './types';
import { parseDate } from '@internationalized/date';

const pb = new PocketBase('https://db.doc.ninja');

// Auth
export const login = async (usernameOrEmail: string, password: string) => {
  return await pb.collection('users').authWithPassword(usernameOrEmail, password);
};

export const logout = () => pb.authStore.clear();

export const getCurrentUser = () => pb.authStore.model;

export const getUsers = async () => {
  const records = await pb.collection('users').getFullList({
    sort: '-created'
  });
  return records;
};

export const getDocuments = async () => {
  const records = (
    await pb.collection('documents').getFullList({
      sort: '-issueDate',
      expand: 'documentFiles'
    })
  ).map(
    (record) =>
      ({
        ...record,
        issueDate: record.issueDate ? parseDate(record.issueDate.substr(0, 10)) : null
      }) as RowMeta<Document>
  );
  console.log(records);
  return records;
};

export const saveDocument = async (document: NewDocument) => {
  const documentFiles = await Promise.all(
    document.files.map((file) =>
      saveDocumentFiles({
        file,
        filename: file.name,
        originFilename: file.name,
        meta: null,
        filetype: file.type.startsWith('image') ? 'image' : 'pdf'
      })
    )
  );

  const formData = new FormData();
  documentFiles.forEach((documentFile) => {
    formData.append('documentFiles', documentFile.id);
  });
  document.files.forEach((file) => {
    formData.append('files', file);
    saveDocumentFiles({
      file,
      filename: file.name,
      originFilename: file.name,
      meta: null,
      filetype: file.type.startsWith('image') ? 'image' : 'pdf'
    });
  });
  formData.append('supplier', document.supplier || '');
  formData.append('reference', document.reference || '');
  formData.append('issueDate', document.issueDate?.toString() || '');
  formData.append('validityPeriod', document.validityPeriod || '');
  formData.append('owner', document.owner);
  return await pb.collection('documents').create<Document>(formData);
};

const saveDocumentFiles = async ({
  file,
  filename,
  originFilename
}: Omit<DocumentFile, 'file'> & { file: File }) => {
  const formData = new FormData();
  formData.append('file', file);
  if (filename) formData.append('filename', filename);
  if (originFilename) formData.append('originFilename', originFilename);
  return await pb
    .collection('documentFiles')
    .create<RowMeta<DocumentFile>>(formData, { requestKey: null });
};

export const updateDocument = async (id: string, document: Partial<Document>) => {
  return await pb
    .collection('documents')
    .update(id, { ...document, issueDate: document.issueDate?.toString() || '' });
};

export const deleteDocument = async (id: string) => {
  return await pb.collection('documents').delete(id);
};
