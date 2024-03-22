import { Address } from "viem";

export type Chain = {
  chainId: number;
  name: string;
  icon: string;
  isL1: boolean;
  sendingEnabled: boolean;
  receivingEnabled: boolean;
  currency: {
    address: Address;
    icon: string;
    symbol: string;
    name: string;
    decimals: number;
    minNativeCurrencyForGas: string;
  };
  rpcs: string[];
  explorers: string[];
};
