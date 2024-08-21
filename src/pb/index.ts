import PocketBase from 'pocketbase';
import type { Document, RowMeta } from './types';

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
  const records = await pb.collection('documents').getFullList<RowMeta<Document>>({
    sort: '-created'
  });
  return records;
};

export const saveDocument = async (document: Document) => {
  const formData = new FormData();
  document.files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('supplier', document.supplier || '');
  formData.append('reference', document.reference || '');
  formData.append('date', document.date || '');
  formData.append('validityPeriod', document.validityPeriod || '');
  formData.append('owner', document.owner);
  return await pb.collection('documents').create<Document>(formData);
};
