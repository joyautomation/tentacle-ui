import { isFail, createSuccess, createFail, createErrorString } from "@joyautomation/dark-matter";
import { P as PlcFragment, v as validateRequestConfig } from "../../../../chunks/fragment.js";
import { EventSource } from "eventsource";
import { EventEmitter } from "node:events";
import { e as error } from "../../../../chunks/index2.js";
const plc = `
  subscription {
    plc {
      ...Plc
    }
  }
  ${PlcFragment}
`;
async function createPlcServerEvents(events) {
  const action = async ({ data }) => {
    const plc2 = JSON.parse(data)?.data?.plc;
    events.emit("change", { refresh: false, plc: plc2 });
  };
  const configResult = validateRequestConfig();
  if (isFail(configResult)) return configResult;
  const { protocol, host, port, url } = configResult.output;
  const createSourceResult = createSource(
    `${protocol}://${host}:${port}${url}`,
    plc,
    action,
    (e) => console.error("Event source error:", e)
  );
  if (isFail(createSourceResult)) return createSourceResult;
  const source = createSourceResult.output;
  return createSuccess(source);
}
function createSource(endpoint, query, action, error2) {
  try {
    const source = new EventSource(`${endpoint}?query=${query}`);
    source.addEventListener("next", action);
    source.addEventListener("error", error2);
    return createSuccess(source);
  } catch (e) {
    return createFail(createErrorString(e));
  }
}
function destroySource(source) {
  source.close();
}
async function GET({ locals }) {
  let onChange;
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
        controller.enqueue("event:message\ndata: " + JSON.stringify({ updates }) + "\n\n");
      };
      metricEvents.on("change", onChange);
    },
    cancel() {
      metricEvents.removeAllListeners();
      destroySource(source);
    }
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    }
  });
}
export {
  GET
};
