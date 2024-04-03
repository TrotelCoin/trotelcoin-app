import { createPublicClient, http, createWalletClient } from "viem";
import { mainnet, polygon, polygonMumbai } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http("", {
    batch: {
      wait: 16,
    },
  }),
});

export const testPublicClient = createPublicClient({
  chain: polygonMumbai,
  transport: http("", {
    batch: {
      wait: 16,
    },
  }),
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http("", {
    batch: {
      wait: 16,
    },
  }),
});

export const testWalletClient = createWalletClient({
  chain: polygonMumbai,
  transport: http("", {
    batch: {
      wait: 16,
    },
  }),
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: http("", {
    batch: {
      wait: 16,
    },
  }),
});
