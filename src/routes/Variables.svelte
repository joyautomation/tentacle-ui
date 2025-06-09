<script lang="ts">
	import Section from './Section.svelte';
	import type {
		Plc,
		PlcSourceRuntime,
		PlcVariableError,
		PlcVariableRestSourceRuntime,
		PlcVariableRuntime
	} from '$lib/graphql/generated/graphql';
	import Toggle from '$lib/components/ToggleSwitch.svelte';
	import VariableEditor from './VariableEditor.svelte';
	import { format } from 'date-fns';
	import { Link } from '@joyautomation/salt/icons';
	import { slide } from 'svelte/transition';

	const { plc }: { plc: Plc } = $props();
	const variables = $derived(
		plc?.runtime?.variables?.filter((variable) => {
			return (
				variable.id?.includes(filter) ||
				variable.description?.includes(filter) ||
				variable.value?.includes(filter) ||
				variable.datatype?.includes(filter)
			);
		}) || []
	);

	function isPlcVariableRestSourceRuntime(source: unknown): source is PlcVariableRestSourceRuntime {
		return (
			typeof source === 'object' &&
			source !== null &&
			'type' in source &&
			source.type === 'rest' &&
			'timeout' in source
		);
	}

	function getErrorText(error: PlcVariableError | null, variable: PlcVariableRuntime) {
		if (error?.message?.startsWith('AbortError')) {
			if (variable.source && isPlcVariableRestSourceRuntime(variable.source)) {
				return `Request timed out after ${variable.source.timeout} ms`;
			}
			return 'Request timed out';
		}
		return `${error?.message}`;
	}

	function formatError(error: PlcVariableError | null, variable: PlcVariableRuntime) {
		if (!error) return '';
		const date = format(new Date(error.timestamp || Date.now()), 'yyyy-MM-dd HH:mm:ss');
		return `${date}: ${getErrorText(error, variable)}`;
	}

	function getSourceState(sourceId: string) {
		return plc?.runtime?.sources?.find((source) => source.id === sourceId)?.state || 'Unknown';
	}

	function getSourceStateColor(sourceId: string) {
		const state = getSourceState(sourceId);
		console.log(sourceId, state);
		if (state === 'connected') {
			return 'var(--theme-neutral-700)';
		}
		if (state === 'disconnected') {
			return 'var(--orange-500)';
		}
		if (state === 'errored') {
			return 'var(--red-500)';
		}
		return 'var(--theme-neutral-700)';
	}

	let filter = $state('');
</script>

<Section title="Variables">
	{#snippet header()}
		<div class="flex justify-between flex-grow ml-3">
			<div class="variable__count">{variables.length}</div>
			<input
				style:flex-basis="200px"
				style:height="30px"
				type="text"
				placeholder="Filter"
				bind:value={filter}
			/>
		</div>
	{/snippet}
	<div class="lines alternating-background last-child-rounded">
		{#each variables as variable}
			<article transition:slide>
				<div class="variable__info">
					<h3 class="variable__name">{variable.id}</h3>
					{#if variable.source}
						<div
							class="variable__source"
							style:color={getSourceStateColor(variable.source.id || '')}
							style:border={`solid 1px ${getSourceStateColor(variable.source.id || '')}`}
						>
							<Link size="1rem" />{variable.source.type === 'rest' ? 'REST' : variable.source.id}
							{#if variable.source.type === 'modbus'}
								{variable.source.register}
							{/if}
							{#if variable.source.type === 'mqtt'}
								{variable.source.topic}
							{/if}
							{#if variable.source.type === 'redis'}
								{variable.source.key}
							{/if}
						</div>
					{/if}
					<p class="variable__description">{variable.description}</p>
					{#if variable.error}
						<p class="variable__error">
							{formatError(variable.error, variable)}
						</p>
					{/if}
					<p class="variable__value">
						{#if variable.datatype === 'boolean'}
							<Toggle
								id={variable.id || ''}
								name="value"
								checked={variable.value === 'true'}
								action="?/setValue"
								idName="id"
							/>
						{:else if variable.datatype === 'number'}
							<VariableEditor
								id={variable.id || ''}
								value={variable.value}
								decimals={variable.decimals}
							/>
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
	.variable__count {
		border-radius: var(--rounded-full);
		padding: 0 calc(var(--spacing-unit) * 2);
		background-color: var(--theme-neutral-50);
		display: flex;
		align-items: center;
		justify-content: center;
	}
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
		gap: 0 calc(var(--spacing-unit) * 2);
		grid-template-columns: auto auto 1fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'name source value'
			'description description value'
			'error error error';

		& > .variable__name {
			grid-area: name;
			font-size: var(--text-lg);
			line-height: var(--text-lg-lh);
		}
		& > .variable__source {
			display: grid;
			grid-template-columns: auto auto;
			gap: 0 calc(var(--spacing-unit) * 1);
			align-items: center;
			grid-area: source;
			font-size: var(--text-sm);
			line-height: var(--text-sm-lh);
			background-color: var(--theme-neutral-300);
			padding: calc(var(--spacing-unit) * 0.5);
			border-radius: var(--rounded-full);
			justify-self: center;
			align-self: center;
			padding-left: calc(var(--spacing-unit) * 1);
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
