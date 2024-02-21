import { createPublicClient, http, createWalletClient, Address } from "viem";
import { polygon } from "viem/chains";
import { ethers } from "ethers";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(),
});
