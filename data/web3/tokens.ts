import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Token } from "@/types/web3/token";
import type { Address } from "viem";

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

export const matic: Token = {
  address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  decimals: 18,
  symbol: "MATIC",
};

export const nativeAddress: Address =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
