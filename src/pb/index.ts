import PocketBase from 'pocketbase';
import type { Document, NewDocument, RowMeta } from './types';
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
      sort: '-issueDate'
    })
  ).map(
    (record) =>
      ({
        ...record,
        issueDate: record.issueDate ? parseDate(record.issueDate.substr(0, 10)) : null
      }) as RowMeta<Document>
  );
  return records;
};

export const saveDocument = async (document: NewDocument) => {
  const formData = new FormData();
  document.files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('supplier', document.supplier || '');
  formData.append('reference', document.reference || '');
  formData.append('issueDate', document.issueDate?.toString() || '');
  formData.append('validityPeriod', document.validityPeriod || '');
  formData.append('owner', document.owner);
  return await pb.collection('documents').create<Document>(formData);
};

export const updateDocument = async (id: string, document: Partial<Document>) => {
  return await pb
    .collection('documents')
    .update(id, { ...document, date: document.issueDate?.toString() || '' });
};
