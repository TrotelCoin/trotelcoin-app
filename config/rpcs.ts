import * as dotenv from "dotenv";
import { polygon, polygonAmoy, mainnet } from "viem/chains";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY as string;
const INFURA_API_KEY = process.env.INFURA_API_KEY as string;
const NODIES_POLYGON_URL = process.env.NODIES_POLYGON_URL as string;
const NODIES_POLYGON_AMOY_URL = process.env.NODIES_POLYGON_AMOY_URL as string;
const NODIES_MAINNET_URL = process.env.NODIES_MAINNET_URL as string;
const GROVE_ID = process.env.GROVE_ID as string;
const ANKR_API_KEY = process.env.ANKR_API_KEY as string;

export const rpcs = {
  [polygon.id]: {
    transports: {
      https: [
        NODIES_POLYGON_URL,
        `https://poly-mainnet.rpc.grove.city/v1/${GROVE_ID}`,
        `https://rpc.ankr.com/polygon/${ANKR_API_KEY}`
      ],
      wss: [
        `wss://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        `wss://polygon-mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
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
        `wss://polygon-amoy.infura.io/ws/v3/${INFURA_API_KEY}`
      ]
    }
  },
  [mainnet.id]: {
    transports: {
      https: [
        NODIES_MAINNET_URL,
        `https://eth-mainnet.rpc.grove.city/v1/${GROVE_ID}`,
        `https://rpc.ankr.com/eth/${ANKR_API_KEY}`
      ],
      wss: [
        `wss://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        `wss://mainnet.infura.io/ws/v3/${INFURA_API_KEY}`
      ]
    }
  }
};
