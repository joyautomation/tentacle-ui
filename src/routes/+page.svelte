<script lang="ts">
	import { createSuccess, isSuccess } from '@joyautomation/dark-matter';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { info, plc: initialPlc } = $derived(data);
	// svelte-ignore state_referenced_locally
	let plc = $state(initialPlc);

	onMount(() => {
		const sse = new EventSource('/api/tentacle');
		sse.addEventListener('message', (event) => {
			const updates = JSON.parse(event.data);
			plc = Promise.resolve(createSuccess(updates.updates.plc));
		});
		return () => {
			sse.close();
		};
	});
</script>

{#await info}
	<p>Loading...</p>
{:then info}
	{#if isSuccess(info)}
		<p>{info.output}</p>
	{:else}
		<p>{info.error}</p>
	{/if}
{/await}

{#await plc}
	<p>Loading...</p>
{:then plc}
	{#if isSuccess(plc)}
		<pre>{JSON.stringify(plc.output, null, 2)}</pre>
	{:else}
		<p>{plc.error}</p>
	{/if}
{/await}
