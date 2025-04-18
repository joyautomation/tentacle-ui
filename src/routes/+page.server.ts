import { actions as saltActions } from "@joyautomation/salt";
const { setTheme } = saltActions;
import { redirect } from "@sveltejs/kit";
import { sendRequest } from "$lib/graphql/request";
import { info, plc } from "$lib/graphql/query";
import type { Plc } from "$lib/graphql/generated/graphql.js";
import { setValue } from "$lib/graphql/mutation.js";
import {
	createToastError,
	createToastFromResult,
} from "$lib/formActions/utils";

export const actions = {
	setTheme,
	setValue: async ({ request }) => {
		const data = await request.formData();
		const variableId = data.get("id");
		const value = data.get("value");
		if (!variableId) {
			return createToastError("Invalid variableId");
		}
		const result = await sendRequest({
			query: setValue,
			variables: { variableId, value },
		});
		return createToastFromResult(result, `Value set successfully to ${value}`);
	},
};

export const load = () => {
	return {
		info: sendRequest({ query: info }),
		plc: sendRequest<Plc>({ query: plc }).then((result) => {
			console.log(result);
			return result
		}),
	};
};
