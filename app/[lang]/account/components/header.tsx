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
import MaxStreak from "@/app/[lang]/account/components/header/statistics/maxStreak";
import { useContext, useState } from "react";
import NameModal from "@/app/[lang]/account/components/header/nameModal";
import UserContext from "@/app/[lang]/contexts/userContext";

const Header = ({ dict, lang }: { dict: DictType | null; lang: Lang }) => {
  const [nameModal, setNameModal] = useState<boolean>(false);

  const address = useAddress();
  const { username: name, setUsername: setName } = useContext(UserContext);

  const { data: ensName } = useEnsName({
    address: address as Address,
    enabled: Boolean(address),
    chainId: mainnet.id,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
          {typeof dict?.account !== "string" && <>{dict?.account.hello}</>},{" "}
          <span
            onClick={() => setNameModal(true)}
            className={`font-bold hover:text-blue-500 cursor-pointer`}
          >
            {localStorage.getItem("username") ||
            localStorage.getItem("username") !== "null" ||
            localStorage.getItem("username") !== "" ? (
              <>{localStorage.getItem("username")}</>
            ) : ensName ? (
              <>{ensName}</>
            ) : (
              <>{shortenAddress(address as Address)}</>
            )}
          </span>{" "}
          👋
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto">
        <Satisfaction dict={dict as DictType} lang={lang} />

        <Rank dict={dict as DictType} />

        <Balance dict={dict as DictType} />

        <NumberOfQuizzesAnswered dict={dict as DictType} />

        <TotalRewardsPending dict={dict as DictType} />

        <MaxStreak lang={lang} />
      </div>
      <NameModal
        lang={lang}
        name={name}
        setName={setName}
        nameModal={nameModal}
        setNameModal={setNameModal}
      />
    </>
  );
};

export default Header;
