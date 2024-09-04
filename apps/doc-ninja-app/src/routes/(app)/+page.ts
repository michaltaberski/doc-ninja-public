import { getDocuments } from '@/pb';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  const documents = await getDocuments();
  return { documents };
};
