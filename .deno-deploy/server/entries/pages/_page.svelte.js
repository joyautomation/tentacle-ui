import { z as attr_style, A as bind_props, w as push, G as escape_html, y as pop, E as ensure_array_like, B as attr, F as attr_class, M as await_block } from "../../chunks/index.js";
import { isSuccess } from "@joyautomation/dark-matter";
import "../../chunks/client.js";
import { f as fallback } from "../../chunks/equality.js";
import { format } from "date-fns";
function Link($$payload, $$props) {
  let size = fallback($$props["size"], "1.5rem");
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr_style("", { height: size, width: size })}><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"></path></svg>`;
  bind_props($$props, { size });
}
function TaskExecutionBar($$payload, $$props) {
  push();
  const { task } = $$props;
  const waitTime = task?.metrics?.waitTime ?? 0;
  const executeTime = task?.metrics?.executeTime ?? 0;
  const totalTime = waitTime + executeTime;
  const waitBasis = totalTime > 0 ? waitTime / totalTime * 100 : 0;
  const executeBasis = totalTime > 0 ? executeTime / totalTime * 100 : 0;
  $$payload.out += `<div class="flex justify-between"><span>${escape_html(executeTime.toFixed(2))}ms</span> <span>${escape_html(waitTime.toFixed(2))}ms</span></div> <div class="flex execution-bar svelte-10jv992"><div class="svelte-10jv992"${attr_style("", { "flex-basis": `${executeBasis}%` })}></div> <div class="svelte-10jv992"${attr_style("", { "flex-basis": `${waitBasis}%` })}></div></div>`;
  pop();
}
function Section($$payload, $$props) {
  const { children, title, header } = $$props;
  $$payload.out += `<section class="svelte-icv0ow"><div class="header svelte-icv0ow"><h2 class="svelte-icv0ow">${escape_html(title)}</h2> `;
  if (header) {
    $$payload.out += "<!--[-->";
    header($$payload);
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="svelte-icv0ow">`;
  children($$payload);
  $$payload.out += `<!----></div></section>`;
}
function Error($$payload, $$props) {
  const { text } = $$props;
  $$payload.out += `<p class="error svelte-1ms55h6">${escape_html(text || "Unknown Error")}</p>`;
}
function Tasks($$payload, $$props) {
  push();
  const { plc } = $$props;
  const tasks = plc?.runtime?.tasks || [];
  Section($$payload, {
    title: "Tasks",
    children: ($$payload2) => {
      const each_array = ensure_array_like(tasks);
      $$payload2.out += `<div class="lines"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let task = each_array[$$index];
        $$payload2.out += `<article class="svelte-j6dgq"><div class="task__info svelte-j6dgq"><h3 class="task__name svelte-j6dgq">${escape_html(task.name)}</h3> <p class="task__description svelte-j6dgq">${escape_html(task.description)}</p> <p class="task__scanRate svelte-j6dgq">${escape_html(task.scanRate)}ms</p></div> <div>`;
        TaskExecutionBar($$payload2, { task });
        $$payload2.out += `<!----></div> `;
        if (task.error?.message) {
          $$payload2.out += "<!--[-->";
          Error($$payload2, { text: task.error?.message });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></article>`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
  });
  pop();
}
function Mqtt($$payload, $$props) {
  push();
  const { plc } = $$props;
  const mqtts = plc?.runtime?.mqtt || [];
  Section($$payload, {
    title: "MQTT",
    children: ($$payload2) => {
      $$payload2.out += `<div class="lines">`;
      if (mqtts.length > 0) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(mqtts);
        $$payload2.out += `<!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let mqtt = each_array[$$index];
          $$payload2.out += `<article class="svelte-i0bmye"><div class="mqtt__info svelte-i0bmye"><p class="mqtt__brokerUrl svelte-i0bmye">${escape_html(mqtt.brokerUrl)}</p> <p class="mqtt__clientId svelte-i0bmye">${escape_html(mqtt.clientId)}</p> <p class="mqtt__state svelte-i0bmye">${escape_html(mqtt.state)}</p></div></article>`;
        }
        $$payload2.out += `<!--]-->`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<p class="p-3 svelte-i0bmye">No MQTT connections</p>`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
  });
  pop();
}
function Sources($$payload, $$props) {
  push();
  const { plc } = $$props;
  const sources = plc?.runtime?.sources || [];
  Section($$payload, {
    title: "Sources",
    children: ($$payload2) => {
      const each_array = ensure_array_like(sources);
      $$payload2.out += `<div class="lines"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let source = each_array[$$index];
        $$payload2.out += `<article class="svelte-1gsxg3f"><div class="source__info svelte-1gsxg3f">`;
        if (source.type === "modbus") {
          $$payload2.out += "<!--[-->";
          $$payload2.out += `<img height="30px" src="/logoModbus.png" alt="Modbus" class="svelte-1gsxg3f"/>`;
        } else if (source.type === "redis") {
          $$payload2.out += "<!--[1-->";
          $$payload2.out += `<img height="30px" src="/logoRedis.png" alt="Redis" class="svelte-1gsxg3f"/>`;
        } else {
          $$payload2.out += "<!--[!-->";
          $$payload2.out += `<img height="30px" src="/network-server.png" alt="Redis" class="svelte-1gsxg3f"/>`;
        }
        $$payload2.out += `<!--]--> <h3 class="source__name svelte-1gsxg3f">${escape_html(source.name)}</h3> <p class="source__host svelte-1gsxg3f">${escape_html(source.host)}:${escape_html(source.port)}</p> <p class="source__description svelte-1gsxg3f">${escape_html(source.description)}</p> <p class="source__state svelte-1gsxg3f">${escape_html(source.state)}</p></div> `;
        if (source.error?.message) {
          $$payload2.out += "<!--[-->";
          Error($$payload2, { text: source.error?.message });
        } else {
          $$payload2.out += "<!--[!-->";
        }
        $$payload2.out += `<!--]--></article>`;
      }
      $$payload2.out += `<!--]--></div>`;
    }
  });
  pop();
}
function ToggleSwitch($$payload, $$props) {
  let checked = fallback($$props["checked"], false);
  let name = $$props["name"];
  let action = $$props["action"];
  let id = $$props["id"];
  let idName = fallback($$props["idName"], "id");
  $$payload.out += `<form method="POST"${attr("action", action)} class="svelte-1y757jv"><button${attr_class("toggle-switch svelte-1y757jv", void 0, { "toggle-switch--active": checked })}${attr("aria-label", `Toggle ${name}`)}><span class="slider svelte-1y757jv"></span></button> <input${attr("name", name)} type="hidden"${attr("value", !checked)}/> <input${attr("name", idName)} type="hidden"${attr("value", id)}/></form>`;
  bind_props($$props, { checked, name, action, id, idName });
}
function VariableEditor($$payload, $$props) {
  push();
  const { value, decimals } = $$props;
  $$payload.out += `<div class="variable-editor svelte-6myuli">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <button class="svelte-6myuli">${escape_html(parseFloat(value).toFixed(decimals))}</button></div>`;
  pop();
}
function Variables($$payload, $$props) {
  push();
  const { plc } = $$props;
  const variables = plc?.runtime?.variables?.filter((variable) => {
    return variable.id?.includes(filter) || variable.description?.includes(filter) || variable.value?.includes(filter) || variable.datatype?.includes(filter);
  }) || [];
  function isPlcVariableRestSourceRuntime(source) {
    return typeof source === "object" && source !== null && "type" in source && source.type === "rest" && "timeout" in source;
  }
  function getErrorText(error, variable) {
    if (error?.message?.startsWith("AbortError")) {
      if (variable.source && isPlcVariableRestSourceRuntime(variable.source)) {
        return `Request timed out after ${variable.source.timeout} ms`;
      }
      return "Request timed out";
    }
    return `${error?.message}`;
  }
  function formatError(error, variable) {
    if (!error) return "";
    const date = format(new Date(error.timestamp || Date.now()), "yyyy-MM-dd HH:mm:ss");
    return `${date}: ${getErrorText(error, variable)}`;
  }
  function getSourceState(sourceId) {
    return plc?.runtime?.sources?.find((source) => source.id === sourceId)?.state || "Unknown";
  }
  function getSourceStateColor(sourceId) {
    const state = getSourceState(sourceId);
    console.log(sourceId, state);
    if (state === "connected") {
      return "var(--theme-neutral-700)";
    }
    if (state === "disconnected") {
      return "var(--orange-500)";
    }
    if (state === "errored") {
      return "var(--red-500)";
    }
    return "var(--theme-neutral-700)";
  }
  let filter = "";
  {
    let header = function($$payload2) {
      $$payload2.out += `<div class="flex justify-between flex-grow ml-3"><div class="variable__count svelte-173k40e">${escape_html(variables.length)}</div> <input type="text" placeholder="Filter"${attr("value", filter)}${attr_style("", { "flex-basis": "200px", height: "30px" })}/></div>`;
    };
    Section($$payload, {
      title: "Variables",
      header,
      children: ($$payload2) => {
        const each_array = ensure_array_like(variables);
        $$payload2.out += `<div class="lines alternating-background last-child-rounded svelte-173k40e"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let variable = each_array[$$index];
          $$payload2.out += `<article class="svelte-173k40e"><div class="variable__info svelte-173k40e"><h3 class="variable__name svelte-173k40e">${escape_html(variable.id)}</h3> `;
          if (variable.source) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<div class="variable__source svelte-173k40e"${attr_style("", {
              color: getSourceStateColor(variable.source.id || ""),
              border: `solid 1px ${getSourceStateColor(variable.source.id || "")}`
            })}>`;
            Link($$payload2, { size: "1rem" });
            $$payload2.out += `<!---->${escape_html(variable.source.type === "rest" ? "REST" : variable.source.id)} `;
            if (variable.source.type === "modbus") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `${escape_html(variable.source.register)}`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (variable.source.type === "mqtt") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `${escape_html(variable.source.topic)}`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--> `;
            if (variable.source.type === "redis") {
              $$payload2.out += "<!--[-->";
              $$payload2.out += `${escape_html(variable.source.key)}`;
            } else {
              $$payload2.out += "<!--[!-->";
            }
            $$payload2.out += `<!--]--></div>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <p class="variable__description svelte-173k40e">${escape_html(variable.description)}</p> `;
          if (variable.error) {
            $$payload2.out += "<!--[-->";
            $$payload2.out += `<p class="variable__error svelte-173k40e">${escape_html(formatError(variable.error, variable))}</p>`;
          } else {
            $$payload2.out += "<!--[!-->";
          }
          $$payload2.out += `<!--]--> <p class="variable__value svelte-173k40e">`;
          if (variable.datatype === "boolean") {
            $$payload2.out += "<!--[-->";
            ToggleSwitch($$payload2, {
              id: variable.id || "",
              name: "value",
              checked: variable.value === "true",
              action: "?/setValue",
              idName: "id"
            });
          } else if (variable.datatype === "number") {
            $$payload2.out += "<!--[1-->";
            VariableEditor($$payload2, {
              id: variable.id || "",
              value: variable.value,
              decimals: variable.decimals
            });
          } else {
            $$payload2.out += "<!--[!-->";
            $$payload2.out += `${escape_html(variable.value)}`;
          }
          $$payload2.out += `<!--]--></p></div></article>`;
        }
        $$payload2.out += `<!--]--></div>`;
      }
    });
  }
  pop();
}
function _page($$payload, $$props) {
  push();
  const { data } = $$props;
  const { info, plc: initialPlc } = data;
  let plc = initialPlc;
  await_block(
    $$payload,
    plc,
    () => {
      $$payload.out += `<p>Loading...</p>`;
    },
    (plc2) => {
      if (isSuccess(plc2)) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<main class="layout svelte-9bumx6"><div class="left-column svelte-9bumx6"><div id="tentacle-tasks">`;
        Tasks($$payload, { plc: plc2.output });
        $$payload.out += `<!----></div> <div id="tentacle-mqtt">`;
        Mqtt($$payload, { plc: plc2.output });
        $$payload.out += `<!----></div> <div id="tentacle-sources">`;
        Sources($$payload, { plc: plc2.output });
        $$payload.out += `<!----></div></div> <div id="tentacle-variables">`;
        Variables($$payload, { plc: plc2.output });
        $$payload.out += `<!----></div></main>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<p>${escape_html(plc2.error)}</p>`;
      }
      $$payload.out += `<!--]-->`;
    }
  );
  $$payload.out += `<!--]-->`;
  pop();
}
export {
  _page as default
};
