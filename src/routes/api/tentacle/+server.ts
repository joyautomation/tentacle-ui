import { createPlcServerEvents, destroySource } from '$lib/sse.js';
import { plc } from '$lib/graphql/subscription.js';
import { EventEmitter } from 'node:events';
import { isFail } from '@joyautomation/dark-matter';
import { error } from '@sveltejs/kit';
import type { Plc } from '$lib/types';

let i = 0;
export async function GET({ locals }) {
	/** @type {ReturnType<typeof setInterval> | undefined} */
	let onChange: (plc: Plc) => void;
	const metricEvents = new EventEmitter();

	const createPlcServerEventsResult = await createPlcServerEvents(metricEvents);
	if (isFail(createPlcServerEventsResult)) {
		console.error(createPlcServerEventsResult.error);
		throw error(500, createPlcServerEventsResult.error);
	}
	const source = createPlcServerEventsResult.output;
	const stream = new ReadableStream({
		start(controller) {
			onChange = (updates) => {
				controller.enqueue('event:message\ndata: ' + JSON.stringify({ updates }) + '\n\n');
			};
			metricEvents.on('change', onChange);
		},
		cancel() {
			metricEvents.removeAllListeners();
			destroySource(source);
		}
	});
	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
}
