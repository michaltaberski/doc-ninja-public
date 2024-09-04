import PocketBase from 'pocketbase';
import type { Document, NewDocument } from './types';
import { transformDocument } from './pb-utils';

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

export const getAllDocuments = async ({ filter }: { filter?: string }) => {
  const records = (
    await pb.collection('documents').getFullList({
      sort: '-issueDate',
      filter
    })
  ).map(transformDocument);
  return records;
};

export const getDocuments = async () => {
  return getAllDocuments({ filter: 'deletedDate = NULL' });
};

export const getDeletedDocuments = async () => {
  return getAllDocuments({ filter: 'deletedDate != NULL' });
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
    .update(id, { ...document, issueDate: document.issueDate?.toString() || '' });
};

export const deleteDocument = async (id: string) => {
  return await pb
    .collection('documents')
    .update(id, { deletedDate: new Date().toISOString() });
};

export const deleteDocumentPermanently = async (id: string) => {
  return await pb.collection('documents').delete(id);
};

export const deleteFileFromDocument = async (documentId: string, file: string) => {
  await pb.collection('documents').update(documentId, { 'files-': [file] });
};

export const addFilesToDocument = async (documentId: string, files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });
  return await pb.collection('documents').update(documentId, formData);
};
