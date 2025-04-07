import {
	createErrorString,
	createFail,
	createSuccess,
	type Result
} from '@joyautomation/dark-matter';

/**
 * Validates an input value using a provided validator function.
 * If validation fails and a default value is provided, returns the default value.
 *
 * @template T - The type of the input value
 * @param {T} input - The value to validate
 * @param {(input: T) => null | string} validator - A function that returns null if valid, or an error message string if invalid
 * @param {T} [defaultValue] - Optional fallback value to use if validation fails
 * @returns {Result<{ value: T, default: boolean }>} A Result containing:
 *   - value: The validated input or default value
 *   - default: Boolean indicating if the default value was used (true) or if the input was valid (false)
 * @throws {Result<string>} Returns a failed Result with error message if validation fails and no default value is provided
 */
export function validate<T>(
	input: T,
	validator: (input: T) => null | string,
	defaultValue?: T
): Result<{ value: T; default: boolean }> {
	try {
		const validation = validator(input);
		if (validation == null) {
			return createSuccess({ value: input, default: false });
		} else {
			if (defaultValue != null) {
				return createSuccess({ value: defaultValue, default: true });
			} else {
				return createFail(validation);
			}
		}
	} catch (e) {
		return createFail(createErrorString(e));
	}
}
