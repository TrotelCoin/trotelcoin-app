import { ethers } from "ethers";

// Connect to the Binance Smart Chain
const provider = new ethers.JsonRpcProvider(
  "https://bsc-dataseed.binance.org/"
);
const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap Router address for BSC

export { provider, routerAddress };
