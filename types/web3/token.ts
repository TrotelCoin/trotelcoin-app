import { Address } from "viem";

export type Token = {
  address: Address;
  decimals: number;
  symbol: string;
  name: string;
  chainId: number;
  icon?: string;
  logoURI: string;
  chainAgnosticId?: number;
  lightLogoURI?: string;
  darkLogoURI?: string;
  balance?: number;
};
