import { DictType, Lang } from "@/types/types";
import { shortenAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { mainnet, polygon } from "viem/chains";
import { useEnsName, useReadContract, useAccount } from "wagmi";
import Satisfaction from "@/app/[lang]/account/components/satisfaction";
import Rank from "@/app/[lang]/account/components/rank";
import Balance from "@/app/[lang]/account/components/balance";
import NumberOfQuizzesAnswered from "@/app/[lang]/account/components/numberOfQuizzesAnswered";
import TotalRewardsPending from "@/app/[lang]/account/components/totalRewardsPending";

const Header = ({ dict, lang }: { dict: DictType | null; lang: Lang }) => {
  const { address } = useAccount();

  const { data: intermediate } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinIntermediateABI,
    address: trotelCoinIntermediateAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: expert } = useReadContract({
    chainId: polygon.id,
    abi: trotelCoinExpertABI,
    address: trotelCoinExpertAddress,
    functionName: "balanceOf",
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    watch: true,
  });
  const { data: ensName } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
  });

  const intermediateBalance: number = parseFloat(intermediate as string);
  const expertBalance: number = parseFloat(expert as string);

  const isNotPremium = intermediateBalance <= 0 && expertBalance <= 0;

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
        <span className={`font-bold`}>
          {ensName && ensName !== null ? (
            <>{ensName}</>
          ) : (
            <>{shortenAddress(address)}</>
          )}
        </span>{" "}
        👋
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        <Satisfaction dict={dict as DictType} lang={lang} />

        <Rank
          dict={dict as DictType}
          isNotPremium={isNotPremium}
          intermediateBalance={intermediateBalance}
          expertBalance={expertBalance}
        />

        <Balance dict={dict as DictType} />

        <NumberOfQuizzesAnswered dict={dict as DictType} />

        <TotalRewardsPending dict={dict as DictType} />
      </div>
    </>
  );
};

export default Header;
