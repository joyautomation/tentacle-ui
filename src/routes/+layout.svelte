<script lang="ts">
	import '@joyautomation/salt/styles.scss';
	import '$lib/css/main.scss';
	import { theme } from '$lib/stores/theme';
	import { ThemeButton } from '@joyautomation/salt';
	import { onMount } from 'svelte';
	let mounted = $state(false);
	const { data, children } = $props();
	$effect(() => {
		if (mounted) {
			theme.initialize(data.theme);
		}
	});
	onMount(() => {
		mounted = true;
	});
</script>

<header>
	<nav>
		<a href="/"><img class="logo" src="/tentacle.png" alt="Tentacle" /></a>
		<div><ThemeButton theme={$theme} /></div>
	</nav>
</header>
{@render children()}

<style>
	header {
		& > nav {
			display: flex;
			justify-content: space-between;
		}
		top: var(--spacing-unit);
		left: var(--spacing-unit);
		right: var(--spacing-unit);
	}
</style>
