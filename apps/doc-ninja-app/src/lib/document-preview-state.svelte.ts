import { getContext, setContext, type ComponentProps } from 'svelte';
import DocumentPreviewSheet from '@/lib/components/document-sheet/document-preview-sheet.svelte';

export type DocumentPreviewSheetProps = Omit<
  ComponentProps<DocumentPreviewSheet>,
  'open'
>;

export class DocumentPreviewState {
  documentPreviewProps = $state<DocumentPreviewSheetProps>({});
  toastToTimeoutMap = new Map<string, number>();

  openDocumentPreview(documentPreviewSheetProps: DocumentPreviewSheetProps) {
    this.documentPreviewProps = documentPreviewSheetProps;
  }

  closeDocumentPreview() {
    this.documentPreviewProps = {};
  }
}

const DOCUMENT_PREVIEW_KEY = Symbol('DOCUMENT_PREVIEW');

export function setDocumentPreviewState() {
  return setContext(DOCUMENT_PREVIEW_KEY, new DocumentPreviewState());
}

export function getDocumentPreviewState() {
  return getContext<ReturnType<typeof setDocumentPreviewState>>(DOCUMENT_PREVIEW_KEY);
}
