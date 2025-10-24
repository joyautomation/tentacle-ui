import { z as attr_style, A as bind_props, B as attr, E as ensure_array_like, F as attr_class, G as escape_html, y as pop, w as push, I as store_get, J as unsubscribe_stores } from "../../chunks/index.js";
import { w as writable } from "../../chunks/exports.js";
import "../../chunks/client.js";
/* empty css                                              */
import "../../chunks/client2.js";
import { f as fallback } from "../../chunks/equality.js";
function setTheme(form) {
  if (form?.context === "setTheme") {
    if (form?.theme === "themeDark") {
      document.body.classList.add("themeDark");
      document.body.classList.remove("themeLight");
    } else {
      document.body.classList.remove("themeDark");
      document.body.classList.add("themeLight");
    }
  }
}
function Moon($$payload, $$props) {
  let size = fallback($$props["size"], "1.5rem");
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr_style("", { width: size, height: size })}><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"></path></svg>`;
  bind_props($$props, { size });
}
function Sun($$payload, $$props) {
  let size = fallback($$props["size"], "1.5rem");
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${attr_style("", { width: size, height: size })}><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"></path></svg>`;
  bind_props($$props, { size });
}
function ThemeButton($$payload, $$props) {
  let theme2 = $$props["theme"];
  let action = fallback($$props["action"], "setTheme");
  $$payload.out += `<form method="POST"${attr("action", `?/${action}`)}><input type="hidden" name="theme"${attr("value", theme2 === "themeDark" ? "themeLight" : "themeDark")}/> <button class="button--icon button__dark-mode">`;
  if (theme2 === "themeDark") {
    $$payload.out += "<!--[-->";
    Moon($$payload, {});
  } else {
    $$payload.out += "<!--[!-->";
    Sun($$payload, {});
  }
  $$payload.out += `<!--]--></button></form>`;
  bind_props($$props, { theme: theme2, action });
}
const initializer = [];
const notifications = { current: initializer };
function Toast($$payload, $$props) {
  push();
  const each_array = ensure_array_like(
    // Only process if we have new form data with a message
    // and enough time has passed since the last notification (e.g., 50ms)
    notifications.current
  );
  $$payload.out += `<div class="toast svelte-10o7pcy"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let notification = each_array[$$index];
    $$payload.out += `<div${attr_class("svelte-10o7pcy", void 0, {
      "toast--success": notification.type === "success",
      "toast--error": notification.type === "error",
      "toast--warning": notification.type === "warning"
    })}>${escape_html(notification.message)}</div>`;
  }
  $$payload.out += `<!--]--></div>`;
  pop();
}
function createThemeStore() {
  const { subscribe, set } = writable("themeLight");
  function initialize(savedTheme) {
    if (savedTheme == null) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme2 = prefersDark ? "themeDark" : "themeLight";
      setTheme({ context: "setTheme", theme: theme2 });
      set(theme2);
    } else {
      setTheme({ context: "setTheme", theme: savedTheme });
      set(savedTheme);
    }
  }
  return {
    subscribe,
    initialize
  };
}
const theme = createThemeStore();
function _layout($$payload, $$props) {
  push();
  var $$store_subs;
  const { data, children } = $$props;
  $$payload.out += `<header class="svelte-nny8nk"><nav class="svelte-nny8nk"><a href="/"><img class="logo" src="/tentacle.png" alt="Tentacle"/></a> <div class="m-2">`;
  ThemeButton($$payload, { theme: store_get($$store_subs ??= {}, "$theme", theme) });
  $$payload.out += `<!----></div></nav></header> `;
  children($$payload);
  $$payload.out += `<!----> `;
  Toast($$payload);
  $$payload.out += `<!---->`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  _layout as default
};
