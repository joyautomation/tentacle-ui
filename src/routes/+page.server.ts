import { actions as saltActions } from '@joyautomation/salt';
const { setTheme } = saltActions;
import { redirect } from '@sveltejs/kit';

export const actions = {
	setTheme
};
