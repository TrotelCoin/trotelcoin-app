import type { ExtendedChain } from "@/types/web3/chain";

export const polygonChain: ExtendedChain = {
  id: 137,
  name: "Polygon",
  icon: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745",
  isL1: false,
  sendingEnabled: true,
  receivingEnabled: true,
  refuel: {
    sendingEnabled: true,
    receivingEnabled: true
  },
  nativeCurrency: {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    icon: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745",
    symbol: "MATIC",
    name: "Polygon",
    decimals: 18,
    minNativeCurrencyForGas: "0.000000000000000001"
  },
  testnet: false,
  rpcUrls: { default: { http: ["https://rpc-mainnet.matic.network"] } },
  blockExplorers: {
    default: {
      name: "Polygonscan",
      url: "https://polygonscan.com",
      apiUrl: "https://api.polygonscan.com/api"
    }
  }
};
