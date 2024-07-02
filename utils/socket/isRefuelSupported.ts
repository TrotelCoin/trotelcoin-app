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

  const refuelEnabled: boolean =
    fromChainResponse[0].refuel.sendingEnabled &&
    toChainResponse[0].refuel.receivingEnabled;

  return refuelEnabled;
};
