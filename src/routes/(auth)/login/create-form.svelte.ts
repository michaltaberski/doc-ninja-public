export const createForm = <T extends object>(
  initialValue: T,
  {
    onSubmit
  }: {
    onSubmit: (value: T) => Promise<void>;
  }
) => {
  const formState = $state<T>(initialValue);
  const formMeta = $state({
    isSubmitting: false
  });
  const handleSubmit = async () => {
    formMeta.isSubmitting = true;
    try {
      await onSubmit(formState);
    } finally {
      formMeta.isSubmitting = false;
    }
  };
  return { state: formState, handleSubmit, formMeta };
};
