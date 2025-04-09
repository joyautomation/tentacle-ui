<script lang="ts">
	import { enhance } from '$app/forms';

	export let checked = false;
	export let name: string;
	export let action: string;
	export let id: string;
	export let idName: string = "id";
</script>

<form
	method="POST"
	{action}
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false, invalidateAll: false });
		};
	}}
>
	<button class="toggle-switch" class:toggle-switch--active={checked} aria-label={`Toggle ${name}`}>
		<span class="slider"></span>
	</button>
	<input {name} type="hidden" value={!checked} />
	<input name={idName} type="hidden" value={id} />
</form>

<style lang="scss">
	/* Define the size variable */
	:root {
		--toggle-size: 40px;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		& > button {
			background-color: transparent;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
		}
	}

	/* Use the size variable for the toggle switch */
	.toggle-switch {
		display: inline-block;
		position: relative;
		width: var(--toggle-size);
		height: calc(var(--toggle-size) * 0.6); /* 60% of the width */
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--theme-neutral-400);
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: calc(var(--toggle-size) * 0.6); /* 60% of the width */
	}

	.slider:before {
		position: absolute;
		content: '';
		top: calc(var(--toggle-size) * 0.1);
		height: calc(var(--toggle-size) * 0.4);
		width: calc(var(--toggle-size) * 0.4); /* 52% of the width */
		left: calc(var(--toggle-size) * 0.08); /* 8% of the width */
		bottom: calc(var(--toggle-size) * 0.08); /* 8% of the width */
		background-color: var(--theme-neutral-50);
		-webkit-transition: 0.4s;
		transition: 0.4s;
		border-radius: 50%;
	}

	.toggle-switch--active > .slider {
		background-color: var(--theme-primary);
	}

	.toggle-switch:focus > .slider {
		box-shadow: 0 0 1px var(--theme-primary);
	}

	.toggle-switch--active > .slider:before {
		-webkit-transform: translateX(calc(var(--toggle-size) * 0.45)); /* 52% of the width */
		-ms-transform: translateX(calc(var(--toggle-size) * 0.45)); /* 52% of the width */
		transform: translateX(calc(var(--toggle-size) * 0.45)); /* 52% of the width */
	}
</style>
