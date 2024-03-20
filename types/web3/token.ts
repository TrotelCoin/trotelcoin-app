import { Address } from "viem";

export type Token = {
  address: Address;
  decimals: number;
  symbol: string;
};
