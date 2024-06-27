import * as dotenv from "dotenv";
import { polygon, polygonAmoy, mainnet } from "viem/chains";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

// General RPCs
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
const INFURA_API_KEY = process.env.INFURA_API_KEY as string;
const GROVE_ID = process.env.GROVE_ID as string;
const ANKR_API_KEY = process.env.ANKR_API_KEY as string;
const DRPC_API_KEY = process.env.DRPC_API_KEY as string;

// Polygon RPCs
const NODIES_POLYGON_URL = process.env.NODIES_POLYGON_URL as string;
const SUBQUERY_POLYGON_RPC = "https://polygon.rpc.subquery.network/public";
const QUICKNODE_MATIC_API_KEY = process.env.QUICKNODE_MATIC_API_KEY as string;
const OMNIA_MATIC_API_KEY = process.env.OMNIA_MATIC_API_KEY as string;
const LAVANET_POLYGON_API_KEY = process.env.LAVANET_POLYGON_API_KEY as string;
const GETBLOCK_POLYGON_API_KEY = process.env.GETBLOCK_POLYGON_API_KEY as string;
const DRPC_POLYGON_API_KEY = process.env.DRPC_POLYGON_API_KEY as string;

// Polygon Amoy RPCs
const NODIES_POLYGON_AMOY_URL = process.env.NODIES_POLYGON_AMOY_URL as string;

// Mainnet RPCs
const NODIES_MAINNET_URL = process.env.NODIES_MAINNET_URL as string;
const SUBQUERY_ETHEREUM_RPC = "https://ethereum.rpc.subquery.network/public";

export const rpcs = {
  [polygon.id]: {
    transports: {
      https: [
        NODIES_POLYGON_URL,
        `https://poly-mainnet.rpc.grove.city/v1/${GROVE_ID}`,
        `https://rpc.ankr.com/polygon/${ANKR_API_KEY}`,
        SUBQUERY_POLYGON_RPC
      ],
      wss: [
        `wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        `wss://polygon-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
        `wss://blissful-neat-flower.matic.quiknode.pro/${QUICKNODE_MATIC_API_KEY}`,
        `wss://endpoints.omniatech.io/v1/ws/matic/mainnet/${OMNIA_MATIC_API_KEY}`,
        `wss://g.w.lavanet.xyz:443/gateway/polygon1/rpc/${LAVANET_POLYGON_API_KEY}`,
        `https://go.getblock.io/${GETBLOCK_POLYGON_API_KEY}`,
        `wss://lb.drpc.org/ogws?network=polygon&dkey=${DRPC_API_KEY}`
      ]
    }
  },
  [polygonAmoy.id]: {
    transports: {
      https: [
        NODIES_POLYGON_AMOY_URL,
        `https://amoy-testnet-archival.rpc.grove.city/v1/${GROVE_ID}`,
        `https://rpc.ankr.com/polygon_amoy/${ANKR_API_KEY}`
      ],
      wss: [
        `wss://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        `wss://polygon-amoy.infura.io/ws/v3/${INFURA_API_KEY}`,
        `wss://lb.drpc.org/ogws?network=polygon-amoy&dkey=${DRPC_POLYGON_API_KEY}`
      ]
    }
  },
  [mainnet.id]: {
    transports: {
      https: [
        NODIES_MAINNET_URL,
        `https://eth-mainnet.rpc.grove.city/v1/${GROVE_ID}`,
        `https://rpc.ankr.com/eth/${ANKR_API_KEY}`,
        SUBQUERY_ETHEREUM_RPC
      ],
      wss: [
        `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`,
        `wss://lb.drpc.org/ogws?network=ethereum&dkey=${DRPC_API_KEY}`
      ]
    }
  }
};
