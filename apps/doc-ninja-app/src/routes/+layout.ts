import { getCurrentUser } from '@/pb';

export const ssr = false;
export const load = async () => {
  const currentUser = getCurrentUser();
  return { currentUser };
};
