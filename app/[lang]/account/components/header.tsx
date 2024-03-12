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
import Tilt from "react-parallax-tilt";
import "animate.css";

const Header = ({ dict, lang }: { dict: DictType | null; lang: Lang }) => {
  const [nameModal, setNameModal] = useState<boolean>(false);

  const address = useAddress();
  const {
    username: name,
    setUsername: setName,
    isUsernameLoading,
  } = useContext(UserContext);

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
            {isUsernameLoading ? (
              <div className="animate__animated animate__flash animate__slower animate__infinite">
                {lang === "en" ? "Loading..." : "Chargement..."}
              </div>
            ) : localStorage.getItem("username") ? (
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

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
        >
          <Balance dict={dict as DictType} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
        >
          <NumberOfQuizzesAnswered dict={dict as DictType} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
        >
          <TotalRewardsPending dict={dict as DictType} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
        >
          <MaxStreak lang={lang} />
        </Tilt>
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
