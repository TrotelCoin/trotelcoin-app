import { trotelCoinAddress } from "@/data/web3/addresses";
import type { Token } from "@/types/web3/token";
import type { Address } from "viem";
import { polygon } from "viem/chains";

export const trotelCoinPolygon: Token = {
  address: trotelCoinAddress,
  decimals: 18,
  symbol: "TROTEL",
  name: "TrotelCoin",
  chainId: polygon.id,
  logoURI: "/assets/logo/trotelcoin.svg",
  lightLogoURI: "/assets/logo/trotelcoin.svg",
  darkLogoURI: "/assets/logo/trotelcoin-dark.jpg",
};

export const usdcPolygon: Token = {
  address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  decimals: 6,
  symbol: "USDC",
  name: "USDC",
  chainId: polygon.id,
  logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg",
};

export const nativeAddress: Address =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
