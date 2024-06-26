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
    webSocket(
      `wss://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
    ),
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
    webSocket(
      `wss://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
    ),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http()
});

export const testWalletClient = createWalletClient({
  chain: polygonAmoy,
  transport: http()
});

export const ensClient = createPublicClient({
  chain: mainnet,
  transport: fallback([
    webSocket(
      `wss://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY as string}`
    ),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});
