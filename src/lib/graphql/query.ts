import { PlcFragment } from './fragment';

export const info = `
  query {
    info
  }
`;

export const plc = `
  query {
    plc {
      ...Plc
    }
  }
  ${PlcFragment}
`;
