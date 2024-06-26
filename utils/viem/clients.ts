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
    webSocket(rpcs[polygon.id].transports.wss[0]),
    webSocket(rpcs[polygon.id].transports.wss[1]),
    http(rpcs[polygon.id].transports.https[0]),
    http(rpcs[polygon.id].transports.https[1]),
    http(rpcs[polygon.id].transports.https[2]),
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
    webSocket(rpcs[polygonAmoy.id].transports.wss[0]),
    webSocket(rpcs[polygonAmoy.id].transports.wss[1]),
    http(rpcs[polygonAmoy.id].transports.https[0]),
    http(rpcs[polygonAmoy.id].transports.https[1]),
    http(rpcs[polygonAmoy.id].transports.https[2]),
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
    webSocket(rpcs[mainnet.id].transports.wss[0]),
    webSocket(rpcs[mainnet.id].transports.wss[1]),
    http(rpcs[mainnet.id].transports.https[0]),
    http(rpcs[mainnet.id].transports.https[1]),
    http(rpcs[mainnet.id].transports.https[2]),
    http("", {
      batch: {
        wait: 16
      }
    })
  ])
});
