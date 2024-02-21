import { createPublicClient, http, createWalletClient, Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { polygon } from "viem/chains";

export const publicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: polygon,
  transport: http(),
});

export const centralWalletAddress = privateKeyToAccount(
  process.env.PRIVATE_KEY_WALLET as Address
);
