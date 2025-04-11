<script lang="ts">
	import Section from './Section.svelte';
	import type { Plc } from '$lib/graphql/generated/graphql';
	import Toggle from '$lib/components/ToggleSwitch.svelte';
	import VariableEditor from './VariableEditor.svelte';

	const { plc }: { plc: Plc } = $props();
	const variables = $derived(plc?.runtime?.variables || []);
</script>

<Section title="Variables">
	<div class="lines alternating-background last-child-rounded">
		{#each variables as variable}
			<article>
				<div class="variable__info">
					<h3 class="variable__name">{variable.id}</h3>
					<p class="variable__description">{variable.description}</p>
					{#if variable.error}
						<p class="variable__error">
							{variable.error?.timestamp}: {variable.error?.message}
						</p>
					{/if}
					<p class="variable__value">
						{#if variable.datatype === 'boolean'}
							<span></span>
							<Toggle
								id={variable.id || ''}
								name="value"
								checked={variable.value === 'true'}
								action="?/setValue"
								idName="id"
							/>
						{:else if variable.datatype === 'number'}
							<VariableEditor id={variable.id || ''} value={variable.value} />
						{:else}
							{variable.value}
						{/if}
					</p>
				</div>
			</article>
		{/each}
	</div>
</Section>

<style lang="scss">
	.last-child-rounded {
		& > article:last-child {
			border-radius: var(--rounded-md);
		}
	}
	article {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-unit) * 2);
		padding: calc(var(--spacing-unit) * 2);
	}
	.variable__info {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'name value'
			'description value'
			'error value';

		& > .variable__name {
			grid-area: name;
			font-size: var(--text-lg);
			line-height: var(--text-lg-lh);
		}
		& > .variable__description {
			grid-area: description;
		}
		& > .variable__value {
			align-items: center;
			font-family: monospace;
			grid-area: value;
			justify-self: end;
      align-self: center;
		}
		& > .variable__error {
			grid-area: error;
			color: var(--red-500);
		}
	}
</style>
