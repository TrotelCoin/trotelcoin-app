import supportedChains from "@/data/chains/supportedChains";

export const isSupportedChain = (chainId: number) => {
  return supportedChains.some((supportedChainId) => supportedChainId === chainId);
};
