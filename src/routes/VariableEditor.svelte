<script>
	import { enhance } from '$app/forms';
	import { Pencil, Xmark } from '@joyautomation/salt/icons';
	import { slide } from 'svelte/transition';
	const { id, value, decimals } = $props();
	const editedValue = $state(value);
	let showEditor = $state(false);
</script>

<div class="variable-editor">
	{#if showEditor}
		<form transition:slide={{ axis: 'x' }} class="flex align-center space-x-2" method="post" action="?/setValue" use:enhance={() => {
			return ({update}) => {
				update({reset: false, invalidateAll: false});
			}
		}}>
			<input type="hidden" name="id" value={id} />
			<input class="variable__input" type="text" name="value" value={editedValue} />
			<button type="submit" class="button--icon"><Pencil /></button>
			<button type="button" class="button--icon" onclick={() => showEditor = false}><Xmark /></button>
		</form>
	{/if}
	<button onclick={() => showEditor = !showEditor}>{parseFloat(value).toFixed(decimals)}</button>
</div>

<style lang="scss">
	.variable__input {
		text-align: end;
	}
	.variable-editor {
		display: flex;
		& > button:last-child {
			flex-basis: 100px;
			flex-shrink: 0;
			width: 100px;
			background-color: transparent;
			color: var(--theme-neutral-950);
			text-align: right;
			&:hover {
				color: var(--white);
				background-color: var(--theme-primary);
			}
		}
		gap: calc(var(--spacing-unit) * 2);
		align-items: center;
	}

</style>
