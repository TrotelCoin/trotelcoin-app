import { Chain } from "@/types/web3/chain";

export const polygonChain: Chain = {
  chainId: 137,
  name: "Polygon",
  icon: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745",
  isL1: false,
  sendingEnabled: true,
  receivingEnabled: true,
  currency: {
    address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    icon: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745",
    symbol: "MATIC",
    name: "Polygon",
    decimals: 18,
    minNativeCurrencyForGas: "0.000000000000000001"
  },
  rpcs: ["https://rpc-mainnet.matic.network"],
  explorers: ["https://polygonscan.com"]
};
