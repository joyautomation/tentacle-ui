export const setValue = `
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
