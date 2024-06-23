import { Address } from "viem";
import { polygon } from "viem/chains";

export const contracts: {
  [key: number]: {
    trotelCoinAddress: Address;
    trotelCoinEarlyAddress: Address;
    trotelCoinIntermediateAddress: Address;
    trotelCoinExpertAddress: Address;
    trotelCoinLearningAddress: Address;
    trotelCoinStakingV1: Address;
    trotelCoinStakingV2: Address;
    usdcAddress: Address;
    trotelCoinDAOAddress: Address;
    trotelCoinShop: Address;
    trotelCoinPolygonUniswapV3Pool: Address;
    usdcPolygonUniswapV3Pool: Address;
  };
} = {
  [polygon.id]: {
    trotelCoinAddress: "0x85057d5a8d063f9075Ba963101D76352051675E5" as Address,
    trotelCoinEarlyAddress:
      "0x72589e2FdDE5503d1cC5b17Bb2e112d589AA69D5" as Address,
    trotelCoinIntermediateAddress:
      "0xbd06D7cf678d2747A076c52Ec977e6A8F21dE936" as Address,
    trotelCoinExpertAddress:
      "0x0BCB13D87ee7396C5079b147458B7d813982939e" as Address,
    trotelCoinLearningAddress:
      "0x25AB0cE7059499d32d49f2ad93a8898295DFa718" as Address,
    trotelCoinStakingV1:
      "0x47350DEF1f6CDA6022703e5e05e6b9a3Ab4b7703" as Address,
    trotelCoinStakingV2:
      "0x5BE3D6E046e69751fBB960FAE3E9c7BF4e011E2a" as Address,
    usdcAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359" as Address,
    trotelCoinDAOAddress:
      "0x804BCfe2cF0C9d363fE2D85FF29CF0A8FfcBB8db" as Address,
    trotelCoinShop: "0xE5DafF84A4F01AE83f8F1F987cC4140E3B7cd639" as Address,
    trotelCoinPolygonUniswapV3Pool:
      "0x360103Feb052aCDa1F09BDFB3D73a0C1B9662C78" as Address,
    usdcPolygonUniswapV3Pool:
      "0xA374094527e1673A86dE625aa59517c5dE346d32" as Address
  }
};
