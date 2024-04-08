import BlueButton from "@/app/[lang]/components/blueButton";
import type { Lang } from "@/types/lang";
import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "@/app/[lang]/contexts/userContext";
import { useAccount } from "wagmi";
import * as Slider from "@radix-ui/react-slider";

const Satisfaction = ({ lang }: { lang: Lang }) => {
  const [selectedNumber, setSelectedNumber] = useState<number[]>([5]);
  const [isResultLoading, setIsResultLoading] = useState<boolean>(false);

  const { alreadyAnsweredSatisfaction, setAlreadyAnsweredSatisfaction } =
    useContext(UserContext);

  const { address } = useAccount();

  const satisfactionResult = async (number: number) => {
    setIsResultLoading(true);
    if (number && address) {
      await axios
        .post(
          `/api/database/postUserSatisfaction?number=${number}&wallet=${address}`
        )
        .catch((error) => {
          console.error(error);
        });
      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
    setIsResultLoading(false);
  };

  return (
    <>
      <div
        className={`col-span-2 md:col-span-4 bg-gray-50 h-full flex items-center justify-center border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-8 dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
          alreadyAnsweredSatisfaction &&
          "hidden animate__animated animate__fadeOut"
        }`}
      >
        <div className="flex flex-col gap-4 mx-auto text-center">
          <span className="text-xl font-semibold">
            {lang === "en"
              ? "Would you recommend TrotelCoin?"
              : "Recommanderiez-vous TrotelCoin?"}
          </span>

          <div className="w-full mx-auto mt-2 relative">
            <div className="flex flex-col w-full pl-2">
              <div className="flex w-full justify-between items-center">
                {Array.from(Array(11).keys()).map((index) => (
                  <span
                    className={`text-sm font-semibold ${
                      selectedNumber[0] >= index
                        ? "rainbow-text"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                    key={index}
                  >
                    {index}
                  </span>
                ))}
              </div>
            </div>

            <form>
              <Slider.Root
                className="relative flex items-center select-none touch-none h-5"
                defaultValue={[5]}
                min={0}
                max={10}
                step={1}
                onValueChange={(e) => setSelectedNumber(e)}
              >
                <Slider.Track className="bg-gray-400 relative grow rounded-full h-2">
                  <Slider.Range className="absolute from-blue-400 to-blue-500 bg-gradient-to-r rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                  className="block w-5 h-5 bg-gray-900 dark:bg-white rounded-full focus:outline-none"
                  aria-label="Satisfaction"
                />
              </Slider.Root>
            </form>
          </div>
          <div className="mx-auto mt-2">
            <BlueButton
              lang={lang}
              onClick={() => satisfactionResult(selectedNumber[0])}
              isLoading={isResultLoading}
              text={lang === "en" ? "Submit" : "Envoyer"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Satisfaction;
