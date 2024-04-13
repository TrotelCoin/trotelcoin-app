import type { Lang } from "@/types/lang";
import { useAccount, useEnsName } from "wagmi";
import { Address } from "viem";
import { mainnet } from "viem/chains";
import Satisfaction from "@/app/[lang]/account/components/header/satisfaction";
import Rank from "@/app/[lang]/account/components/header/rank";
import Balance from "@/app/[lang]/account/components/header/statistics/balance";
import NumberOfQuizzesAnswered from "@/app/[lang]/account/components/header/statistics/numberOfQuizzesAnswered";
import TotalRewardsPending from "@/app/[lang]/account/components/header/statistics/totalRewardsPending";
import shortenAddress from "@/utils/shortenAddress";
import MaxStreak from "@/app/[lang]/account/components/header/statistics/maxStreak";
import Tilt from "react-parallax-tilt";
import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";
import "animate.css";
import { useContext, useEffect } from "react";
import ThemeContext from "@/app/[lang]/contexts/themeContext";
import AverageMark from "@/app/[lang]/account/components/header/statistics/averageMark";
import LearningTime from "@/app/[lang]/account/components/header/statistics/learningTime";

const Header = ({ lang }: { lang: Lang }) => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { theme } = useContext(ThemeContext);
  const { setThemeMode } = useWeb3ModalTheme();

  useEffect(() => {
    setThemeMode(theme);
  }, [theme]);

  const { data: ensName } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl">
          {lang === "en" ? "Hello" : "Bonjour"},{" "}
          <button
            onClick={() => open({ view: "Account" })}
            className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
          >
            <span className={`font-bold`}>
              {ensName ? (
                <>{ensName}</>
              ) : (
                <>{shortenAddress(address as Address)}</>
              )}
            </span>
          </button>{" "}
          👋
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
        <Satisfaction lang={lang} />

        <Rank lang={lang} />

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <Balance lang={lang} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <NumberOfQuizzesAnswered lang={lang} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <TotalRewardsPending lang={lang} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <MaxStreak lang={lang} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <AverageMark lang={lang} />
        </Tilt>

        <Tilt
          glareEnable={true}
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          glareMaxOpacity={0.15}
          perspective={800}
          className="h-full"
        >
          <LearningTime lang={lang} />
        </Tilt>
      </div>
    </>
  );
};

export default Header;
