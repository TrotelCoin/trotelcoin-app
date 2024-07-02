import type { ExtendedChain, SocketChain } from "@/types/web3/chain";
import { convertSocketChainToExtendedChain } from "@/types/web3/chain";
import { fetchSupportedChains } from "@/utils/socket/fetchSupportedChains";

export const isRefuelSupported = async (
  fromChain: ExtendedChain,
  toChain: ExtendedChain
) => {
  const { result: chains } = await fetchSupportedChains();

  let extendedChains: ExtendedChain[] = [];
  chains.map((chain: SocketChain) => {
    extendedChains.push(convertSocketChainToExtendedChain(chain));
  });

  const fromChainResponse = extendedChains.filter((chain: ExtendedChain) => {
    return Number(chain.id) === Number(fromChain.id);
  });

  const toChainResponse = extendedChains.filter((chain: ExtendedChain) => {
    return Number(chain.id) === Number(toChain.id);
  });

  if (
    !fromChainResponse ||
    !toChainResponse ||
    fromChainResponse.length === 0 ||
    toChainResponse.length === 0
  ) {
    return false;
  }

  const refuelEnabled: boolean =
    (fromChainResponse[0]?.refuel?.sendingEnabled as boolean) &&
    (toChainResponse[0]?.refuel?.receivingEnabled as boolean);

  return refuelEnabled;
};
