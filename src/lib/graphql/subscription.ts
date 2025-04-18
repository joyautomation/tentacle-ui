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
          state
        }
        sources {
          id
          type
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
          }
          value
        }
      }
    }
  }
`;
