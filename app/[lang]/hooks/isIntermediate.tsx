import { Address, useContractRead } from "wagmi";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import { polygon } from "viem/chains";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { trotelCoinIntermediateAddress } from "@/data/web3/addresses";

const isIntermediate = () => {
  const [isIntermediate, setIsIntermediate] = useState<boolean>(false);

  const address = useAddress();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  useEffect(() => {
    const intermediateBalance: number = parseFloat(intermediate as string);

    if (intermediateBalance > 0) {
      setIsIntermediate(true);
    }
  }, [intermediate]);

  return isIntermediate;
};

export default isIntermediate;
