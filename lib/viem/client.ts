import { createPublicClient, http, createWalletClient } from "viem";
import { mainnet, polygon, polygonMumbai } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const testPublicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(),
});

export const testWalletClient = createWalletClient({
  chain: polygonMumbai,
  transport: http(),
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
