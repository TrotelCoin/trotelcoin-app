import type { Lang } from "@/types/language/lang";
import { calculateProgressPercentage } from "@/utils/levels/calculateProgressPercentage";
import { calculateUserLevel } from "@/utils/levels/calculateUserLevel";
import { useContext, useEffect, useState } from "react";
import PremiumContext from "@/contexts/premium";
import UserContext from "@/contexts/user";
import { Skeleton } from "@radix-ui/themes";
import CountUp from "react-countup";

const LevelSection = ({ lang }: { lang: Lang }) => {
  const [width, setWidth] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number | null>(null);
  const [quizzesRemaining, setQuizzesRemaining] = useState<number | null>(null);
  const [quizzesRequired, setQuizzesRequired] = useState<number | null>(null);

  const { isNotPremium } = useContext(PremiumContext);
  const { userNumberOfQuizzesAnswered: numberOfQuizzesAnswered } =
    useContext(UserContext);

  useEffect(() => {
    if (numberOfQuizzesAnswered) {
      const { userLevel, quizzesRemaining, quizzesRequired } =
        calculateUserLevel(numberOfQuizzesAnswered);
      const width = calculateProgressPercentage(numberOfQuizzesAnswered);

      setWidth(width);
      setUserLevel(userLevel);
      setQuizzesRemaining(quizzesRemaining);
      setQuizzesRequired(quizzesRequired);
    } else {
      setWidth(0);
      setUserLevel(0);
      setQuizzesRemaining(0);
      setQuizzesRequired(0);
    }
  }, [numberOfQuizzesAnswered]);

  return (
    <>
      <h2 className="mt-10 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {lang === "en" ? "Level" : "Niveau"}
      </h2>
      <div
        className={`mt-4 flex flex-col rounded-xl border border-gray-900/10 bg-white p-10 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100`}
      >
        <div className="flex justify-between">
          <div
            className={`flex gap-1 ${
              isNotPremium && "blur duration-500 hover:blur-none"
            }`}
          >
            {isNotPremium && (
              <p>{lang === "en" ? "Not premium" : "Non premium"}</p>
            )}
            {!isNotPremium && (
              <>
                <Skeleton loading={!userLevel}>
                  <p>{lang === "en" ? "You are level" : "Vous êtes niveau"}</p>
                  {userLevel ? (
                    <>
                      <CountUp start={0} end={userLevel} />
                    </>
                  ) : (
                    <span>0</span>
                  )}
                </Skeleton>
              </>
            )}
          </div>
          <span
            className={`hidden md:block ${
              isNotPremium && "blur duration-500 hover:blur-none"
            }`}
          >
            {!isNotPremium ? (
              <>
                <Skeleton loading={!quizzesRemaining}>
                  <div className="flex items-center gap-2">
                    <span>
                      <CountUp start={0} end={quizzesRemaining as number} />{" "}
                      {lang === "en" ? "quizzes left" : "quiz restant"}
                    </span>
                    <span>•</span>
                    <span>
                      <CountUp
                        start={0}
                        end={Math.max(
                          0,
                          (((quizzesRequired as number) -
                            (quizzesRemaining as number)) /
                            (quizzesRequired as number)) *
                            100
                        )}
                        suffix="%"
                      />
                    </span>
                  </div>
                </Skeleton>
              </>
            ) : (
              `${lang === "en" ? "Not premium" : "Non premium"}`
            )}
          </span>
          <span className="md:hidden">
            {quizzesRemaining &&
            quizzesRemaining > 0 &&
            quizzesRequired &&
            quizzesRequired > 0 &&
            !isNotPremium ? (
              <>
                <Skeleton loading={!quizzesRemaining || !quizzesRequired}>
                  <CountUp
                    start={0}
                    end={Math.max(
                      0,
                      ((quizzesRequired - quizzesRemaining) / quizzesRequired) *
                        100
                    )}
                    suffix="%"
                  />
                </Skeleton>
              </>
            ) : (
              `${lang === "en" ? "Not premium" : "Non premium"}`
            )}
          </span>
        </div>
        <div
          className={`mt-2 flex h-2 overflow-hidden rounded-full bg-gray-400 text-xs ${
            isNotPremium && "mt-4"
          }`}
        >
          <div
            style={{
              width: isNotPremium ? "0%" : `${width}%`,
              transition: "width 0.7s ease-in"
            }}
            className="h-2 rounded-full bg-blue-500"
          />
        </div>
      </div>
    </>
  );
};

export default LevelSection;
