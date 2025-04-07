export const plc = `
  subscription {
    plc {
      runtime {
        mqtt {
          brokerUrl
          clientId
          groupId
          password
          username
          version
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
        }
        tasks {
          id
          name
          description
          program
          scanRate
          interval
          error {
            message
          }
          metrics {
            executeTime
            waitTime
          }
        }
        variables {
          id
          description
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
