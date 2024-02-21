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

const centralWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_WALLET as Address
);

export const centralWalletAddress: Address = centralWallet.address as Address;
