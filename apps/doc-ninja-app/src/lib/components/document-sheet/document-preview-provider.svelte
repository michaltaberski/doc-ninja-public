<script lang="ts">
  import { getDocumentPreviewState } from '$lib/document-preview-state.svelte';
  import PreviewDocumentSheet from './preview-document-sheet.svelte';

  const documentPreviewState = getDocumentPreviewState();
  let open = $state(false);
  $effect(() => {
    if (documentPreviewState.document) {
      open = true;
    }
  });
  $effect(() => {
    if (!open) {
      documentPreviewState.closeDocumentPreview();
    }
  });
</script>

<PreviewDocumentSheet bind:open document={documentPreviewState.document} />
