<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import AuthGuard from '@/lib/components/auth-guard.svelte';
  import { addFilesToDocument, saveDocument } from '@/pb/index.js';
  import SmartDialog from './smart-dialog.svelte';
  import NewDocumentSheet from '@/lib/components/document-sheet/new-document-sheet.svelte';
  import LayoutHeader from './layout-header.svelte';
  import LayoutSidebar from './layout-sidebar.svelte';
  import { fileDrop } from '@/lib/file-drop-action';
  import { setDocumentPreviewState } from '@/lib/document-preview-state.svelte';
  import DocumentPreviewProvider from '@/lib/components/document-sheet/document-preview-provider.svelte';
  import ConfirmDialogProvider from '@/lib/components/ui/confirm-dialog-provider.svelte';
  import { setConfirmDialogState } from '@/lib/confirm-dialog-state.svelte';

  setDocumentPreviewState();
  setConfirmDialogState();

  const { data, children } = $props();

  let open = $state(false);
  let openTray = $state(false);
  let droppedFiles = $state<FileList | null>(null);
</script>

<AuthGuard currentUser={data.currentUser}>
  <div
    class="bg-muted/40 flex min-h-screen w-full flex-col"
    use:fileDrop={{
      onDragEnter: () => {
        open = true;
        droppedFiles = null;
      },
      onDragLeave: () => {
        open = false;
      },
      onDrop: async (files) => {
        open = false;
        droppedFiles = files;
        await new Promise((r) => setTimeout(r, 400));
        openTray = true;
      }
    }}
  >
    <SmartDialog bind:open />

    <NewDocumentSheet
      open={openTray}
      fileList={droppedFiles || undefined}
      onCancel={() => {
        openTray = false;
        droppedFiles = null;
      }}
      onCreateNew={async (documentProps) => {
        if (data.currentUser) {
          await saveDocument({ ...documentProps, owner: data.currentUser.id });
          await invalidateAll();
        }
      }}
      onAddFilesToDocument={async (documentId, files) => {
        if (data.currentUser) {
          await addFilesToDocument(documentId, files);
          await invalidateAll();
        }
      }}
    />
    <div
      class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
    >
      <LayoutSidebar
        activeDocuments={data.activeDocuments}
        deletedDocuments={data.deletedDocuments}
      />
      <div class="flex max-h-[100vh] flex-col">
        <LayoutHeader />
        <main class="flex h-full flex-1 flex-col gap-6 overflow-y-auto bg-white p-4 p-6">
          {@render children()}
        </main>
      </div>
    </div>
  </div>
  <DocumentPreviewProvider />
  <ConfirmDialogProvider />
</AuthGuard>
