import { env } from '$env/dynamic/private';
import { validate } from '$lib/validation';
import {
	createErrorString,
	createFail,
	createSuccess,
	isFail,
	type Result,
	type ResultFail,
	type ResultSuccess
} from '@joyautomation/dark-matter';

type Validator = {
	validator: (input?: string | null) => null | string;
	defaultValue?: string;
};

function getRequestConfig(
	validators: Record<string, Validator>
): Record<string, Result<{ value: string | undefined; default: boolean }>> {
	return Object.keys(validators).reduce((acc, key) => {
		const validator = validators[key];
		const value = env[`TENTACLE_${key.toUpperCase()}`];
		const validation = validate(value, validator.validator, validator.defaultValue);
		return { ...acc, [key]: validation };
	}, {});
}

function isConfigValid(
	config: Record<string, Result<{ value: string | undefined; default: boolean }>>
): config is Record<string, ResultSuccess<{ value: string | undefined; default: boolean }>> {
	return !Object.values(config).some(isFail);
}

export const validateRequestConfig = (): Result<Record<string, string | undefined>> => {
	const validators = {
		protocol: {
			validator: (input?: string | null): null | string => {
				if (input === 'http' || input === 'https') {
					return null;
				}
				return 'Protocol must be http or https';
			},
			defaultValue: 'http'
		},
		host: {
			validator: (input?: string | null): null | string => {
				if (input != null) return null;
				return 'Host must contain a period';
			},
			defaultValue: 'mantle'
		},
		port: {
			validator: (input?: string | null): null | string => {
				if (input != null) {
					const port = parseInt(input, 10);
					if (!isNaN(port) && port > 0 && port <= 65535) {
						return null;
					}
				}
				return 'Port must be a number between 1 and 65535';
			},
			defaultValue: '4001'
		},
		url: {
			validator: (input?: string | null): null | string => {
				if (input != null) return null;
				return 'URL must contain a period';
			},
			defaultValue: '/graphql'
		}
	};
	const configResult = getRequestConfig(validators);
	if (isConfigValid(configResult)) {
		return createSuccess(
			Object.fromEntries(
				Object.entries(configResult).map(([key, value]) => [key, value.output.value])
			)
		);
	}
	const configFailedKey = Object.keys(configResult).find((key) => isFail(configResult[key]));
	if (configFailedKey && isFail(configResult[configFailedKey])) {
		return configResult[configFailedKey];
	}
	return createFail('Uknown config validation error');
};

function isNetworkError(error: unknown) {
	return (
		error instanceof TypeError &&
		(error.message.toLowerCase().includes('fetch') ||
			error.message.toLowerCase().includes('network') ||
			error.message.toLowerCase().includes('connection'))
	);
}

export const sendRequest = <T>({
	query,
	variables,
	token
}: {
	query: string;
	variables?: Record<string, unknown>;
	token?: string;
}): Promise<Result<T>> => {
	const configResult = validateRequestConfig();
	if (isFail(configResult)) return Promise.resolve(configResult);
	const { protocol, host, port, url } = configResult.output;
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json'
	};
	if (token) {
		headers['Authorization'] = `Bearer ${token}`;
	}
	return fetch(`${protocol}://${host}:${port}${url}`, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables
		})
	})
		.then((res) => {
			if (!res.ok) {
				return createFail(res.statusText);
			}
			return res.json();
		})
		.then((body: { data: { [key: string]: T }; errors?: Error[] }) => {
			if (body.errors) {
				return createFail(createErrorString(JSON.stringify(body.errors[0])));
			} else {
				const firstKey = Object.keys(body.data)[0];
				return createSuccess(body.data[firstKey]);
			}
		})
		.catch((err: Error) => {
			if (isNetworkError(err)) {
				return createFail(`Cannot connect to Tentacle on ${host}:${port}`);
			}
			return createFail(err.message);
		});
};
