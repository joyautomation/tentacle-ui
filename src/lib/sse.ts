import {
  createErrorString,
  createFail,
  createSuccess,
  isFail,
  isSuccess,
  type Result,
  type ResultFail,
} from "@joyautomation/dark-matter";
import { sendRequest, validateRequestConfig } from "./graphql/request";
import type { EventEmitter } from "events";
import { EventSource } from "eventsource";
import { plc } from "./graphql/subscription";
import type { Plc } from "./types";

export async function createPlcServerEvents(events: EventEmitter) {
  const action = async ({ data }: { data: string }) => {
    const plc: Plc = JSON.parse(data)?.data?.plc;
    events.emit("change", { refresh: false, plc });
  };
  const configResult = validateRequestConfig();
  if (isFail(configResult)) return configResult;
  const { protocol, host, port, url } = configResult.output;
  const createSourceResult = createSource(
    `${protocol}://${host}:${port}${url}`,
    plc,
    action,
    (e) => console.error("Event source error:", e),
  );
  if (isFail(createSourceResult)) return createSourceResult;
  const source = createSourceResult.output;
  return createSuccess(source);
}

export function createSource(
  endpoint: string,
  query: string,
  action: (event: MessageEvent) => void,
  error: (event: MessageEvent) => void,
) {
  try {
    const source = new EventSource(`${endpoint}?query=${query}`);
    source.addEventListener("next", action);
    source.addEventListener("error", error);
    return createSuccess(source);
  } catch (e) {
    return createFail(createErrorString(e));
  }
}

export function destroySource(source: EventSource) {
  source.close();
}
