import { SocketChain } from "@/types/socket/socket";
import { Chain } from "@/types/web3/chain";
import { fetchSupportedChains } from "@/utils/socket/fetchSupportedChains";

export const isRefuelSupported = async (fromChain: Chain, toChain: Chain) => {
  const { result: chains } = await fetchSupportedChains();

  const fromChainResponse = chains.filter((chain: SocketChain) => {
    return chain.chainId === fromChain.chainId;
  });

  const toChainResponse = chains.filter((chain: SocketChain) => {
    return chain.chainId === toChain.chainId;
  });

  const refuelEnabled: boolean =
    fromChainResponse[0].refuel.sendingEnabled &&
    toChainResponse[0].refuel.receivingEnabled;

  return refuelEnabled;
};
