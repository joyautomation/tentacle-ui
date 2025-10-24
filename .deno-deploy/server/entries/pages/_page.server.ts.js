import "../../chunks/client.js";
/* empty css                                              */
import "../../chunks/client2.js";
import "../../chunks/index2.js";
import { P as PlcFragment, s as sendRequest } from "../../chunks/fragment.js";
import { isSuccess } from "@joyautomation/dark-matter";
const setTheme$1 = async ({ request, cookies }) => {
  const data = await request.formData();
  const theme = data.get("theme");
  cookies.set(`theme`, theme, {
    path: "/",
    secure: false
  });
  const themeName = theme === "themeDark" ? "dark mode" : "light mode";
  return {
    context: "setTheme",
    type: "success",
    message: `You are now in ${themeName}.`,
    theme
  };
};
const saltActions = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  setTheme: setTheme$1
}, Symbol.toStringTag, { value: "Module" }));
const info = `
  query {
    info
  }
`;
const plc = `
  query {
    plc {
      ...Plc
    }
  }
  ${PlcFragment}
`;
const setValue = `
  mutation setValue($variableId: String!, $value: String!) {
    setValue(variableId: $variableId, value: $value) {
      runtime {
        variables {
          id
          value
        }
      }
    }
  }
`;
const createToastFromResult = (result, successMessage) => isSuccess(result) ? {
  message: successMessage || JSON.stringify(result.output),
  type: "success"
} : { message: result.error, type: "error" };
const createToastError = (error) => ({
  message: error,
  type: "error"
});
const { setTheme } = saltActions;
const actions = {
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
      variables: { variableId, value }
    });
    return createToastFromResult(result, `Value set successfully to ${value}`);
  }
};
const load = () => {
  return {
    info: sendRequest({ query: info }),
    plc: sendRequest({ query: plc }).then((result) => {
      console.log(result);
      return result;
    })
  };
};
export {
  actions,
  load
};
