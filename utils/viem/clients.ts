import {
  createPublicClient,
  http,
  createWalletClient,
  fallback,
  webSocket
} from "viem";
import { mainnet, polygon, polygonAmoy } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: fallback([
    webSocket(process.env.POLYGON_ALCHEMY_URL),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});

export const testPublicClient = createPublicClient({
  chain: polygonAmoy,
  transport: fallback([
    webSocket(process.env.POLYGON_AMOY_ALCHEMY_URL),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: fallback([
    webSocket(process.env.POLYGON_ALCHEMY_URL),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});

export const testWalletClient = createWalletClient({
  chain: polygonAmoy,
  transport: fallback([
    webSocket(process.env.POLYGON_AMOY_ALCHEMY_URL),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    webSocket(process.env.MAINNET_ALCHEMY_URL),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});
