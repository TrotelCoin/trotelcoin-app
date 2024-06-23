import { createPublicClient, http, createWalletClient } from "viem";
import { mainnet, polygon, polygonAmoy } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http("", {
    batch: {
      wait: 16
    }
  })
});

export const testPublicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http("", {
    batch: {
      wait: 16
    }
  })
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http("", {
    batch: {
      wait: 16
    }
  })
});

export const testWalletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http("", {
    batch: {
      wait: 16
    }
  })
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: http("", {
    batch: {
      wait: 16
    }
  })
});
