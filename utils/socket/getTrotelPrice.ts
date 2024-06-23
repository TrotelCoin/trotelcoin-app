import { Slippage, Sort } from "@/types/web3/swap";
import { Token } from "@/types/web3/token";
import { Address, formatUnits, parseUnits } from "viem";
import { getQuote } from "@/utils/socket/getQuote";
import { Chain } from "@/types/web3/chain";

export const getTrotelPrice = async (
  fromAmount: number,
  fromToken: Token,
  toToken: Token,
  fromChain: Chain,
  toChain: Chain,
  userAddress: Address,
  uniqueRoutesPerBridge: boolean,
  sort: Sort,
  singleTxOnly: boolean,
  enableRefuel: boolean,
  slippage: Slippage,
  setPrice: React.Dispatch<React.SetStateAction<number | null>>,
  setPriceLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setPriceLoading(true);

  const fromAmountDecimals: number = fromAmount
    ? Number(
        parseUnits(
          Number(fromAmount).toFixed(fromToken.decimals),
          fromToken.decimals
        )
      )
    : 0;

  const quote = await getQuote(
    fromChain.chainId,
    fromToken.address,
    toChain.chainId,
    toToken.address,
    fromAmountDecimals,
    userAddress,
    uniqueRoutesPerBridge,
    sort,
    singleTxOnly,
    enableRefuel,
    slippage
  );

  if (!quote) {
    throw Error;
  }

  const route = quote.result.routes[0];

  if (!route) {
    throw Error;
  }

  const toAmount = Number(route?.toAmount);
  const price = Number(formatUnits(BigInt(toAmount), 6));

  setPrice(route ? price : 0);
  setPriceLoading(false);

  return { route, toAmount };
};
