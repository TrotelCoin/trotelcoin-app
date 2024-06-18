import BlueButton from "@/app/[lang]/components/buttons/blue";
import type { Lang } from "@/types/language/lang";
import axios from "axios";
import React, { useContext, useState } from "react";
import UserContext from "@/contexts/user";
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
      await axios.post(
        `/api/user/satisfaction?number=${number}&wallet=${address}`
      );

      setAlreadyAnsweredSatisfaction(true);
    } else {
      setAlreadyAnsweredSatisfaction(false);
    }
    setIsResultLoading(false);
  };

  return (
    <>
      <div
        className={`col-span-2 flex h-full items-center justify-center rounded-xl border border-gray-900/10 bg-white p-8 text-center text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 md:col-span-3 ${
          alreadyAnsweredSatisfaction &&
          "animate__animated animate__fadeOut hidden"
        }`}
      >
        <div className="mx-auto flex flex-col gap-4 text-center">
          <span className="text-xl font-semibold">
            {lang === "en"
              ? "Would you recommend TrotelCoin?"
              : "Recommanderiez-vous TrotelCoin?"}
          </span>

          <div className="relative mx-auto mt-2 w-full">
            <div className="flex w-full flex-col pl-2">
              <div className="flex w-full items-center justify-between">
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
                className="relative flex h-5 touch-none select-none items-center"
                defaultValue={[5]}
                min={0}
                max={10}
                step={1}
                onValueChange={(e) => setSelectedNumber(e)}
              >
                <Slider.Track className="relative h-2 grow rounded-full bg-gray-400">
                  <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
                </Slider.Track>
                <Slider.Thumb
                  className="block h-5 w-5 rounded-full bg-gray-900 focus:outline-none dark:bg-white"
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
