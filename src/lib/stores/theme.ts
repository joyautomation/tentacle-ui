import { client } from '@joyautomation/salt';
import { writable } from 'svelte/store';

function createThemeStore() {
	const { subscribe, set } = writable<string>('themeLight');

	function initialize(savedTheme: string | null) {
		if (savedTheme == null) {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const theme = prefersDark ? 'themeDark' : 'themeLight';
			client.setTheme({ context: 'setTheme', theme });
			set(theme);
		} else {
			client.setTheme({ context: 'setTheme', theme: savedTheme });
			set(savedTheme);
		}
	}

	return {
		subscribe,
		initialize
	};
}

export const theme = createThemeStore();
