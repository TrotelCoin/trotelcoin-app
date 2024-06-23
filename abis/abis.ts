import { polygon, polygonAmoy } from "viem/chains";

// Polygon ABIs
import allowancePolygon from "@/abis/polygon/misc/erc20/allowance";
import approvePolygon from "@/abis/polygon/misc/erc20/approve";
import usdcPolygon from "@/abis/polygon/misc/tokens/usdc";
import trotelCoinEarlyPolygon from "@/abis/polygon/premium/trotelCoinEarly";
import trotelCoinExpertPolygon from "@/abis/polygon/premium/trotelCoinExpert";
import trotelCoinIntermediatePolygon from "@/abis/polygon/premium/trotelCoinIntermediate";
import trotelCoinShopPolygon from "@/abis/polygon/shop/trotelCoinShop";
import trotelCoinShopV1Polygon from "@/abis/polygon/shop/trotelCoinShopV1";
import trotelCoinStakingV1Polygon from "@/abis/polygon/staking/trotelCoinStakingV1";
import trotelCoinStakingV2Polygon from "@/abis/polygon/staking/trotelCoinStakingV2";
import trotelCoinPolygon from "@/abis/polygon/trotelcoin/trotelCoin";
import trotelCoinPolygonUniswapV3PoolPolygon from "@/abis/polygon/uniswap-v3/trotelCoinPolygonUniswapV3Pool";
import usdcPolygonUniswapV3PoolPolygon from "@/abis/polygon/uniswap-v3/usdcPolygonUniswapV3Pool";

// Polygon Amoy ABIs
import allowancePolygonAmoy from "@/abis/polygon-amoy/misc/erc20/allowance";
import approvePolygonAmoy from "@/abis/polygon-amoy/misc/erc20/approve";
import usdcPolygonAmoy from "@/abis/polygon-amoy/misc/tokens/usdc";
import trotelCoinEarlyPolygonAmoy from "@/abis/polygon-amoy/premium/trotelCoinEarly";
import trotelCoinShopPolygonAmoy from "@/abis/polygon-amoy/shop/trotelCoinShop";
import trotelCoinShopV1PolygonAmoy from "@/abis/polygon-amoy/shop/trotelCoinShopV1";
import trotelCoinStakingV1TestPolygonAmoy from "@/abis/polygon-amoy/staking/trotelCoinStakingV1Test";
import trotelCoinStakingV2TestPolygonAmoy from "@/abis/polygon-amoy/staking/trotelCoinStakingV2Test";
import trotelCoinPolygonAmoy from "@/abis/polygon-amoy/trotelcoin/trotelCoin";

const abis: {
  [key: number]: {
    allowance?: any;
    approve?: any;
    usdc?: any;
    trotelCoinEarly: any;
    trotelCoinExpert?: any;
    trotelCoinIntermediate?: any;
    trotelCoinShop: any;
    trotelCoinShopV1: any;
    trotelCoinStakingV1: any;
    trotelCoinStakingV2: any;
    trotelCoin: any;
    trotelCoinPolygonUniswapV3Pool?: any;
    usdcPolygonUniswapV3Pool?: any;
  };
} = {
  [polygon.id]: {
    allowance: allowancePolygon,
    approve: approvePolygon,
    usdc: usdcPolygon,
    trotelCoinEarly: trotelCoinEarlyPolygon,
    trotelCoinExpert: trotelCoinExpertPolygon,
    trotelCoinIntermediate: trotelCoinIntermediatePolygon,
    trotelCoinShop: trotelCoinShopPolygon,
    trotelCoinShopV1: trotelCoinShopV1Polygon,
    trotelCoinStakingV1: trotelCoinStakingV1Polygon,
    trotelCoinStakingV2: trotelCoinStakingV2Polygon,
    trotelCoin: trotelCoinPolygon,
    trotelCoinPolygonUniswapV3Pool: trotelCoinPolygonUniswapV3PoolPolygon,
    usdcPolygonUniswapV3Pool: usdcPolygonUniswapV3PoolPolygon
  },
  [polygonAmoy.id]: {
    allowance: allowancePolygonAmoy,
    approve: approvePolygonAmoy,
    usdc: usdcPolygonAmoy,
    trotelCoinEarly: trotelCoinEarlyPolygonAmoy,
    trotelCoinShop: trotelCoinShopPolygonAmoy,
    trotelCoinShopV1: trotelCoinShopV1PolygonAmoy,
    trotelCoinStakingV1: trotelCoinStakingV1TestPolygonAmoy,
    trotelCoinStakingV2: trotelCoinStakingV2TestPolygonAmoy,
    trotelCoin: trotelCoinPolygonAmoy
  }
};

export default abis;
