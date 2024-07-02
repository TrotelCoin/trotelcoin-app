import { Address } from "viem";
import type { Chain } from "viem";

export type ChainRpcUrls = {
  http: string[];
  webSocket?: string[];
};

export type SocketChain = {
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
  refuel: {
    sendingEnabled: boolean;
    receivingEnabled: boolean;
  };
  testnet?: boolean;
  rpcs: string[];
  explorers: string[];
};

export type ExtendedChain = Chain & {
  icon?: string;
  isL1?: boolean;
  sendingEnabled?: boolean;
  receivingEnabled?: boolean;
  nativeCurrency: {
    address?: Address;
    icon?: string;
    minNativeCurrencyForGas?: string;
    symbol: string;
    name: string;
    decimals: number;
  };
  refuel?: {
    sendingEnabled?: boolean;
    receivingEnabled?: boolean;
  };
};

export const convertSocketChainToExtendedChain = (
  chain: SocketChain
): ExtendedChain => {
  return {
    id: chain.chainId,
    name: chain.name,
    nativeCurrency: {
      address: chain.currency.address,
      icon: chain.currency.icon,
      symbol: chain.currency.symbol,
      name: chain.currency.name,
      decimals: chain.currency.decimals,
      minNativeCurrencyForGas: chain.currency.minNativeCurrencyForGas
    },
    rpcUrls: {
      default: {
        http: chain.rpcs,
        webSocket: chain.rpcs
      }
    },
    refuel: {
      sendingEnabled: chain.refuel.sendingEnabled,
      receivingEnabled: chain.refuel.receivingEnabled
    },
    blockExplorers:
      chain.explorers.length > 0
        ? {
            default: {
              url: chain.explorers[0],
              name: chain.name
            }
          }
        : undefined,
    testnet: chain.testnet
  };
};
