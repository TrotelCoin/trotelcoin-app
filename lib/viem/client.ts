import { createPublicClient, http, createWalletClient } from "viem";
import { mainnet, polygon } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(),
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
