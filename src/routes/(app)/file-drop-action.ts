export interface FileDropOptions {
  onDragEnter?: (event: DragEvent) => void;
  onDragLeave?: (event: DragEvent) => void;
  onDrop?: (files: FileList) => void;
}

export function fileDrop(node: HTMLElement, { onDragEnter, onDragLeave, onDrop }: FileDropOptions) {
  let dragCounter = 0;

  // Handle the dragenter event
  function handleDragEnter(event: DragEvent) {
    event.preventDefault();
    dragCounter++;
    if (dragCounter === 1 && onDragEnter) {
      onDragEnter(event); // Invoke the onDragEnter callback
      node.classList.add('drag-over');
    }
  }

  // Handle the dragleave event
  function handleDragLeave(event: DragEvent) {
    event.preventDefault();
    dragCounter--;
    if (dragCounter === 0) {
      node.classList.remove('drag-over');
      if (onDragLeave) onDragLeave(event); // Invoke the onDragLeave callback
    }
  }

  // Handle the drop event
  function handleDrop(event: DragEvent) {
    event.preventDefault();
    dragCounter = 0;
    node.classList.remove('drag-over');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0 && onDrop) {
      onDrop(files); // Pass the files to the onDrop callback
    }
  }

  // Add event listeners
  node.addEventListener('dragenter', handleDragEnter);
  node.addEventListener('dragleave', handleDragLeave);
  node.addEventListener('drop', handleDrop);
  node.addEventListener('dragover', (event) => event.preventDefault()); // Prevent default to allow drop

  // Cleanup event listeners when the action is destroyed
  return {
    destroy() {
      node.removeEventListener('dragenter', handleDragEnter);
      node.removeEventListener('dragleave', handleDragLeave);
      node.removeEventListener('drop', handleDrop);
      node.removeEventListener('dragover', (event) => event.preventDefault());
    }
  };
}
