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
		<div>{variables.length}</div>
		{#each variables as variable}
			<article>
				<div class="variable__info">
					<h3 class="variable__name">{variable.id}</h3>
					{#if variable.source}
						<div class="variable__source">
							{variable.source.id}
						</div>
					{/if}
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
							<VariableEditor id={variable.id || ''} value={variable.value} decimals={variable.decimals} />
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
		gap: 0 calc(var(--spacing-unit) * 1);
		grid-template-columns: auto auto 1fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'name source value'
			'description description value'
			'error error value';

		& > .variable__name {
			grid-area: name;
			font-size: var(--text-lg);
			line-height: var(--text-lg-lh);
		}
		& > .variable__source {
			grid-area: source;
			background-color: var(--theme-neutral-300);
			padding: calc(var(--spacing-unit) * 0.5);
			border-radius: var(--rounded-full);
			justify-self: center;
			align-self: center;
			padding-left: calc(var(--spacing-unit) * 2);
			padding-right: calc(var(--spacing-unit) * 2);
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
