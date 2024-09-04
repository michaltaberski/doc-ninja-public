<script lang="ts">
  const { data } = $props();

  $inspect(data);
</script>

This is inbox
<pre>
  {JSON.stringify(
    data.documents.map((document) => document.files),
    null,
    2
  )}
</pre>
