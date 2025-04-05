import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const mainHandle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') ?? 'themeLight';
	event.locals.theme = theme;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme%', theme)
	});
};

export const handle = sequence(mainHandle);
