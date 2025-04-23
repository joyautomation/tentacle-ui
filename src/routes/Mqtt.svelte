<script lang="ts">
	import Section from './Section.svelte';
	import type { Plc } from '$lib/graphql/generated/graphql';

	const { plc }: { plc: Plc } = $props();
	const mqtts = $derived(plc?.runtime?.mqtt || []);
</script>

<Section title="MQTT">
	<div class="lines">
		{#if mqtts.length > 0}
			{#each mqtts as mqtt}
				<article>
					<div class="mqtt__info">
						<p class="mqtt__brokerUrl">{mqtt.brokerUrl}</p>
						<p class="mqtt__clientId">{mqtt.clientId}</p>
						<p class="mqtt__state">{mqtt.state}</p>
					</div>
				</article>
			{/each}
		{:else}
			<p class="p-3">No MQTT connections</p>
		{/if}
	</div>
</Section>

<style lang="scss">
	h3,
	p {
		margin-bottom: 0;
	}
	article {
		& > .mqtt__info {
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto auto;
			grid-template-areas:
				'id state'
				'brokerUrl state'
				'clientId state';

			& > .mqtt__id {
				grid-area: id;
				font-size: var(--text-lg);
				line-height: var(--text-lg-lh);
			}
			& > .mqtt__brokerUrl {
				grid-area: brokerUrl;
			}
			& > .mqtt__clientId {
				grid-area: clientId;
			}
			& > .mqtt__state {
				grid-area: state;
				justify-self: end;
				align-self: center;
				border: solid 1px var(--theme-neutral-300);
				background-color: var(--theme-neutral-300);
				padding: calc(var(--spacing-unit) * 1) calc(var(--spacing-unit) * 3);
				border-radius: var(--rounded-full);
			}
		}
		display: flex;
		flex-direction: column;
		padding: calc(var(--spacing-unit) * 2);
	}
</style>
