import { Address } from "viem";
import { usdc, trotelCoin, nativeAddress } from "@/data/web3/tokens";
import { polygon } from "viem/chains";

export const tokenAddressToName = (tokenAddress: Address, chainId: number) => {
  if (tokenAddress === nativeAddress && chainId === polygon.id) {
    return "MATIC";
  }

  switch (tokenAddress) {
    case trotelCoin.address:
      return "TROTEL";
    case usdc.address:
      return "USDC";
    default:
      return "Unknown";
  }
};
