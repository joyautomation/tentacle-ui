import { d as private_env } from "./shared-server.js";
import { createSuccess, createFail, createErrorString, isFail } from "@joyautomation/dark-matter";
function validate(input, validator, defaultValue) {
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
function getRequestConfig(validators) {
  return Object.keys(validators).reduce((acc, key) => {
    const validator = validators[key];
    const value = private_env[`TENTACLE_${key.toUpperCase()}`];
    const validation = validate(value, validator.validator, validator.defaultValue);
    return { ...acc, [key]: validation };
  }, {});
}
function isConfigValid(config) {
  return !Object.values(config).some(isFail);
}
const validateRequestConfig = () => {
  const validators = {
    protocol: {
      validator: (input) => {
        if (input === "http" || input === "https") {
          return null;
        }
        return "Protocol must be http or https";
      },
      defaultValue: "http"
    },
    host: {
      validator: (input) => {
        if (input != null) return null;
        return "Host must contain a period";
      },
      defaultValue: "mantle"
    },
    port: {
      validator: (input) => {
        if (input != null) {
          const port = parseInt(input, 10);
          if (!isNaN(port) && port > 0 && port <= 65535) {
            return null;
          }
        }
        return "Port must be a number between 1 and 65535";
      },
      defaultValue: "4001"
    },
    url: {
      validator: (input) => {
        if (input != null) return null;
        return "URL must contain a period";
      },
      defaultValue: "/graphql"
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
  return createFail("Uknown config validation error");
};
function isNetworkError(error) {
  return error instanceof TypeError && (error.message.toLowerCase().includes("fetch") || error.message.toLowerCase().includes("network") || error.message.toLowerCase().includes("connection"));
}
const sendRequest = ({
  query,
  variables,
  token
}) => {
  const configResult = validateRequestConfig();
  if (isFail(configResult)) return Promise.resolve(configResult);
  const { protocol, host, port, url } = configResult.output;
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${protocol}://${host}:${port}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables
    })
  }).then((res) => {
    if (!res.ok) {
      return createFail(res.statusText);
    }
    return res.json();
  }).then((body) => {
    if (body.errors) {
      return createFail(createErrorString(JSON.stringify(body.errors[0])));
    } else {
      const firstKey = Object.keys(body.data)[0];
      return createSuccess(body.data[firstKey]);
    }
  }).catch((err) => {
    if (isNetworkError(err)) {
      return createFail(`Cannot connect to Tentacle on ${host}:${port}`);
    }
    return createFail(err.message);
  });
};
const PlcFragment = `fragment Plc on Plc {
  runtime {
    mqtt {
      brokerUrl
      clientId
      groupId
      password
      username
      version
      state
    }
    sources {
      id
      name
      type
      description
      host
      enabled
      port
      retryMaxDelay
      retryMinDelay
      state
      error {
        error
        message
        stack
      }
    }
    tasks {
      id
      name
      description
      program
      scanRate
      interval
      error {
        error
        message
        stack
      }
      metrics {
        executeTime
        waitTime
      }
    }
    variables {
      id
      description
      datatype
      decimals
      error {
        error
        message
        stack
        timestamp
      }
      source {
        ... on PlcVariableModbusSourceRuntime {
          id
          type
          register
          registerType
          rate
          format
        }
        ... on PlcVariableRestSourceRuntime {
          type
          url
          rate
          timeout
        }
        ... on PlcVariableMqttSourceRuntime {
          id
          type
          topic
        } 
        ... on PlcVariableRedisSourceRuntime {
          id
          type
          key
        }
      }
      value
    }
  }
}`;
export {
  PlcFragment as P,
  sendRequest as s,
  validateRequestConfig as v
};
