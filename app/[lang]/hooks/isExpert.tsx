import { Address, useContractRead } from "wagmi";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import { polygon } from "viem/chains";
import { useAddress } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { trotelCoinExpertAddress } from "@/data/addresses";

const isExpert = () => {
  const [isExpert, setIsExpert] = useState<boolean>(false);

  const address = useAddress();

  const { data: expert } = useContractRead({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });

  useEffect(() => {
    const expertBalance: number = parseFloat(expert as string);

    if (expertBalance > 0) {
      setIsExpert(true);
    }
  }, [expert]);

  return isExpert;
};

export default isExpert;
