import { getAllDocuments } from '@doc-ninja/data-layer';
import type { LayoutLoad } from './$types';
import groupBy from 'lodash/groupBy';

export const load: LayoutLoad = async () => {
  const documents = await getAllDocuments();
  const { deletedDocuments = [], activeDocuments = [] } = groupBy(
    documents,
    (document) => (document.deletedDate ? 'deletedDocuments' : 'activeDocuments')
  );
  return { deletedDocuments, activeDocuments };
};
