import { getContext, setContext } from 'svelte';
import { type RowMeta, type Document } from '@/pb/types';

export class DocumentPreviewState {
  document = $state<RowMeta<Document> | undefined>(undefined);
  toastToTimeoutMap = new Map<string, number>();

  openDocumentPreview(document: RowMeta<Document>) {
    this.document = document;
  }

  closeDocumentPreview() {
    this.document = undefined;
  }
}

const DOCUMENT_PREVIEW_KEY = Symbol('DOCUMENT_PREVIEW');

export function setDocumentPreviewState() {
  return setContext(DOCUMENT_PREVIEW_KEY, new DocumentPreviewState());
}

export function getDocumentPreviewState() {
  return getContext<ReturnType<typeof setDocumentPreviewState>>(DOCUMENT_PREVIEW_KEY);
}
