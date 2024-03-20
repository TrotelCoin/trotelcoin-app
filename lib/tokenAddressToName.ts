import { Address } from "viem";
import { usdc, trotelCoin } from "@/data/web3/tokens";

export const tokenAddressToName = (tokenAddress: Address) => {
  switch (tokenAddress) {
    case trotelCoin.address:
      return "TROTEL";
    case usdc.address:
      return "USDC";
    default:
      return "Unknown";
  }
};
