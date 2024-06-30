import {
  createPublicClient,
  http,
  createWalletClient,
  fallback,
  webSocket
} from "viem";
import { mainnet, polygon, polygonAmoy } from "viem/chains";
import { rpcs } from "@/config/rpcs";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: fallback([
    http("", {
      batch: {
        wait: 16
      }
    }),
    webSocket(rpcs[polygon.id].transports.wss[0]),
    webSocket(rpcs[polygon.id].transports.wss[1])
  ])
});

export const testPublicClient = createPublicClient({
  chain: polygonAmoy,
  transport: fallback([
    http("", {
      batch: {
        wait: 16
      }
    }),
    webSocket(rpcs[polygonAmoy.id].transports.wss[0]),
    webSocket(rpcs[polygonAmoy.id].transports.wss[1])
  ])
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
  transport: fallback([
    http("", {
      batch: {
        wait: 16
      }
    }),
    webSocket(rpcs[mainnet.id].transports.wss[0]),
    webSocket(rpcs[mainnet.id].transports.wss[1])
  ])
});
