<script lang="ts">
	import { createSuccess, isSuccess } from '@joyautomation/dark-matter';
	import { onMount } from 'svelte';
	import Tasks from './Tasks.svelte';
	import Mqtt from './Mqtt.svelte';
	import Sources from './Sources.svelte';
	import Variables from './Variables.svelte';

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

{#await plc}
	<p>Loading...</p>
{:then plc}
	{#if isSuccess(plc)}
		<main class="layout">
			<div class="left-column">
				<div id="tentacle-tasks">
					<Tasks plc={plc.output} />
				</div>
				<div id="tentacle-mqtt">
					<Mqtt plc={plc.output} />
				</div>
				<div id="tentacle-sources">
					<Sources plc={plc.output} />
				</div>
			</div>
			<div id="tentacle-variables">
				<Variables plc={plc.output} />
			</div>
		</main>
	{:else}
		<p>{plc.error}</p>
	{/if}
{/await}

<style lang="scss">
	.layout {
		display: grid;
		grid-template-columns: 600px 1fr;
		gap: calc(var(--spacing-unit) * 2);
		margin: calc(var(--spacing-unit) * 2);
	}
	.left-column {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-unit) * 2);
	}
</style>
