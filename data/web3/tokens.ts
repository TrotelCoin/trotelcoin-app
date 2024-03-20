import { trotelCoinAddress } from "@/data/web3/addresses";
import { Token } from "@/types/types";

export const trotelCoin: Token = {
  address: trotelCoinAddress,
  decimals: 18,
  symbol: "TROTEL",
};

export const usdc: Token = {
  address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  decimals: 6,
  symbol: "USDC",
};
