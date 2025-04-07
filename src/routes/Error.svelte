<script lang="ts">
	import { slide } from "svelte/transition";

  const { text }: { text: string } = $props();
</script>

<p class="error" transition:slide>{text || 'Unknown Error'}</p>

<style lang="scss">
.error {
  color: var(--red-500);
  border: 1px solid var(--red-500);
  border-radius: var(--rounded-md);
  padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);
  background-color: var(--red-100);
}
</style>
