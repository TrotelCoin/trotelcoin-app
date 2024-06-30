export type SocketChain = {
  chainId: number;
  name: string;
  icon: string;
  isL1: boolean;
  sendingEnabled: boolean;
  receivingEnabled: boolean;
  refuel: {
    sendingEnabled: boolean;
    receivingEnabled: boolean;
  };
  currency: {
    address: string;
    icon: string;
    name: string;
    symbol: string;
    decimals: number;
    minNativeCurrencyForGas: string;
  };
  rpcs: string[];
  explorers: string[];
};
