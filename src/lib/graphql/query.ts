export const info = `
  query {
    info
  }
`;

export const plc = `
  query {
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
          }
          value
        }
      }
    }
  }
`;
