export const plc = `
  subscription {
    plc {
      runtime {
        mqtt {
        id
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
          source {
            ... on PlcVariableModbusSourceRuntime {
              id
              register
              registerType
              rate
              format
            }
          }
          value
        }
      }
    }
  }
`;
