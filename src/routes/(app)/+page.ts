import { getDocuments, getUsers } from '@/pb';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const users = await getUsers();
  const documents = await getDocuments();
  return { users, documents };
};
