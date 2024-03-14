import { Address } from "viem";

const shortenAddress = (address: Address) => {
  if (!address) return "unknown.eth";

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export default shortenAddress;
