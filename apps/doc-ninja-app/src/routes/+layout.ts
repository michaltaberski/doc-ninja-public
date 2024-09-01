import { getCurrentUser, getDocuments } from '@/pb';

export const ssr = false;
export const load = async () => {
  const currentUser = getCurrentUser();
  const documentsPromise = getDocuments();
  return { currentUser, documentsPromise };
};
