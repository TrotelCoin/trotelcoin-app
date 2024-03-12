import { DictType } from "@/types/types";
import { calculateUserLevel, calculateProgressPercentage } from "@/utils/level";
import { useAddress } from "@thirdweb-dev/react";
import { useContext, useEffect, useState } from "react";
import PremiumContext from "@/app/[lang]/contexts/premiumContext";
import UserContext from "@/app/[lang]/contexts/userContext";

interface LevelSectionProps {
  dict: DictType | null;
}

const LevelSection: React.FC<LevelSectionProps> = ({ dict }) => {
  const [width, setWidth] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number | null>(1);
  const [quizzesRemaining, setQuizzesRemaining] = useState<number | null>(1);

  const address = useAddress();

  const { isNotPremium } = useContext(PremiumContext);
  const { userNumberOfQuizzesAnswered: numberOfQuizzesAnswered } =
    useContext(UserContext);

  useEffect(() => {
    if (numberOfQuizzesAnswered) {
      const { userLevel, quizzesRemaining } = calculateUserLevel(
        numberOfQuizzesAnswered
      );
      const width = calculateProgressPercentage(numberOfQuizzesAnswered);
      setWidth(width);
      setUserLevel(userLevel);
      setQuizzesRemaining(quizzesRemaining);
    } else {
      setWidth(0);
      setUserLevel(1);
      setQuizzesRemaining(0);
    }
  }, [numberOfQuizzesAnswered]);

  return (
    <>
      <h2 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mt-10">
        {typeof dict?.account !== "string" && <>{dict?.account.level}</>}
      </h2>
      <div
        className={`mt-4 bg-gray-100 flex flex-col border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
      >
        <div className="flex justify-between">
          <div
            className={`flex gap-1 ${
              isNotPremium && "blur hover:blur-none duration-500"
            }`}
          >
            {isNotPremium && (
              <p>
                {typeof dict?.account !== "string" && (
                  <>{dict?.account.notPremium}</>
                )}
              </p>
            )}
            {!isNotPremium && (
              <>
                <p>
                  {typeof dict?.account !== "string" && (
                    <>{dict?.account.youAreLevel}</>
                  )}
                </p>
                {userLevel ? (
                  <>{userLevel}</>
                ) : (
                  <span className="animate__animated animate__flash animate__slower animate__infinite">
                    0
                  </span>
                )}
              </>
            )}
          </div>
          <p
            className={`hidden md:block ${
              isNotPremium && "blur hover:blur-none duration-500"
            }`}
          >
            {quizzesRemaining && quizzesRemaining > 0 && !isNotPremium
              ? `${quizzesRemaining.toFixed(0)} ${
                  typeof dict?.account !== "string" &&
                  dict?.account.trotelCoinsLeft
                }`
              : `${
                  typeof dict?.account !== "string" && dict?.account.notPremium
                }`}
          </p>
        </div>
        <div
          className={`overflow-hidden h-2 text-xs bg-gray-400 mt-2 flex rounded-full ${
            isNotPremium && "mt-4"
          }`}
        >
          <div
            style={{
              width: isNotPremium ? "0%" : `${width}%`,
              transition: "width 0.7s ease-in",
            }}
            className="rounded-full h-2 bg-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default LevelSection;
