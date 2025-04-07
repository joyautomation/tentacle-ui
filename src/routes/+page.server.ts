import { actions as saltActions } from '@joyautomation/salt';
const { setTheme } = saltActions;
import { redirect } from '@sveltejs/kit';
import { sendRequest } from '$lib/graphql/request';
import { info, plc } from '$lib/graphql/query';
import type { Plc } from '$lib/graphql/generated/graphql.js';

export const actions = {
	setTheme
};

export const load = () => {
	return {
		info: sendRequest({ query: info }),
		plc: sendRequest<Plc>({ query: plc })
	};
};
