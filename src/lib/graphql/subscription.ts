import { PlcFragment } from './fragment';

export const plc = `
  subscription {
    plc {
      ...Plc
    }
  }
  ${PlcFragment}
`;
