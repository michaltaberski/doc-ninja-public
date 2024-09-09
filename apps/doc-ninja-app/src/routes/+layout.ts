import { getCurrentUser } from '@doc-ninja/data-layer';

export const ssr = false;
export const load = async () => {
  const currentUser = getCurrentUser();
  return { currentUser };
};
