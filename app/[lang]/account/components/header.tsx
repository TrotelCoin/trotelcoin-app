import { DictType, Lang } from "@/types/types";
import { useAddress } from "@thirdweb-dev/react";
import { Address } from "viem";
import { useEnsName, mainnet } from "wagmi";
import Satisfaction from "@/app/[lang]/account/components/header/satisfaction";
import Rank from "@/app/[lang]/account/components/header/rank";
import Balance from "@/app/[lang]/account/components/header/statistics/balance";
import NumberOfQuizzesAnswered from "@/app/[lang]/account/components/header/statistics/numberOfQuizzesAnswered";
import TotalRewardsPending from "@/app/[lang]/account/components/header/statistics/totalRewardsPending";
import shortenAddress from "@/utils/shortenAddress";

const Header = ({ dict, lang }: { dict: DictType | null; lang: Lang }) => {
  const address = useAddress();

  const { data: ensName } = useEnsName({
    address: address as Address,
    enabled: Boolean(address),
    chainId: mainnet.id,
  });

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
        {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
        <span className={`font-bold`}>
          {ensName && ensName !== null ? (
            <>{ensName}</>
          ) : (
            <>{shortenAddress(address as Address)}</>
          )}
        </span>{" "}
        👋
      </h2>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        <Satisfaction dict={dict as DictType} lang={lang} />

        <Rank dict={dict as DictType} />

        <Balance dict={dict as DictType} />

        <NumberOfQuizzesAnswered dict={dict as DictType} />

        <TotalRewardsPending dict={dict as DictType} />
      </div>
    </>
  );
};

export default Header;
