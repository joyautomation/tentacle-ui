import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true, // Enables gzip/brotli compression for smaller files
			external: [] // Bundle all dependencies instead of marking them external
		}),
		csrf: {
			checkOrigin: false
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
