<script lang="ts">
  import { getDocumentPreviewState } from '$lib/document-preview-state.svelte';
  import PreviewDocumentSheet from './document-preview-sheet.svelte';

  const documentPreviewState = getDocumentPreviewState();
</script>

<PreviewDocumentSheet
  open={documentPreviewState.open}
  {...documentPreviewState.documentPreviewProps}
  onCloseComplete={documentPreviewState.onCloseComplete}
/>
