import React from "react";
import Intermediate from "@/app/ui/premium/intermediate";
import Expert from "@/app/ui/premium/expert";
import { useContractRead, Address } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import CountUp from "react-countup";

const trotelCoinIntermediateAddress: Address =
  "0xC637150711632dEB7313A3E87bE66D772BC9BA8C";
const trotelCoinExpertAddress: Address =
  "0xc40B8aF9E501ef716b9caa284Ea26a919Ab43863";

const Subscription = () => {
  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    functionName: "totalSupply",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    functionName: "totalSupply",
    watch: true,
  });

  console.log("Intermediate : ", intermediate, " + ", "Expert : ", expert);

  return (
    <>
      <div className="flex flex-col my-20 max-w-4xl mx-auto">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          Claim your NFTs
        </h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
          <Intermediate />
          <Expert />
        </div>
        <div className="hidden md:grid grid-cols-1 mt-4 md:grid-cols-2 gap-4">
          <div className="overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 blackdrop-blur-xl">
            <div className="px-4 py-5 sm:p-6 text-gray-900 dark:text-gray-100 font-semibold items-center text-center">
              <span className="text-6xl rainbow-text">
                <CountUp
                  start={0}
                  end={parseFloat(intermediate as string)}
                  duration={5}
                />
              </span>{" "}
              Intermediate
            </div>
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 border border-black/10 dark:border-white/10 blackdrop-blur-xl">
            <div className="px-4 py-5 sm:p-6 text-gray-900 dark:text-gray-100 font-semibold items-center text-center">
              <span className="text-6xl rainbow-text">
                <CountUp
                  start={0}
                  end={parseFloat(expert as string)}
                  duration={5}
                />
              </span>{" "}
              Expert
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
