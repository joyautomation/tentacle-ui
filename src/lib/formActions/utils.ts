import { isSuccess, type Result } from "@joyautomation/dark-matter";

export const createToastFromResult = <T>(
  result: Result<T>,
  successMessage?: string,
) =>
  isSuccess(result)
    ? {
      message: successMessage || JSON.stringify(result.output),
      type: "success",
    }
    : { message: result.error, type: "error" };

export const createToastError = (error: string) => ({
  message: error,
  type: "error",
});

export const createToastSuccess = (message: string) => ({
  message,
  type: "success",
});
