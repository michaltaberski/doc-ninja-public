<script lang="ts">
  import { getDocumentPreviewState } from '$lib/document-preview-state.svelte';
  import PreviewDocumentSheet from './document-preview-sheet.svelte';

  const documentPreviewState = getDocumentPreviewState();
  const document = $derived(documentPreviewState.documentPreviewProps.document);
  let open = $state(false);
  $effect(() => {
    if (document) {
      open = true;
    }
  });
  $effect(() => {
    if (!open) {
      documentPreviewState.closeDocumentPreview();
    }
  });
</script>

<PreviewDocumentSheet bind:open {...documentPreviewState.documentPreviewProps} />
