import BlueSimplePopover from "@/app/[lang]/components/popovers/blueSimple";
import { Lang } from "@/types/language/lang";
import * as Switch from "@radix-ui/react-switch";
import * as Popover from "@radix-ui/react-popover";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InformationCircleIcon
} from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import { Sort } from "@/types/web3/swap";
import AudioContext from "@/contexts/audio";
import type { Slippage } from "@/types/web3/swap";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Settings = ({
  lang,
  enableRefuel,
  setEnableRefuel,
  setSort,
  sort,
  slippage,
  setSlippage,
  disableRefuel
}: {
  lang: Lang;
  enableRefuel: boolean;
  setEnableRefuel: React.Dispatch<React.SetStateAction<boolean>>;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
  sort: Sort;
  slippage: Slippage;
  setSlippage: React.Dispatch<React.SetStateAction<Slippage>>;
  disableRefuel: boolean;
}) => {
  const { playAudio } = useContext(AudioContext);

  return (
    <>
      <Popover.Root>
        <Popover.Trigger>
          <BlueSimplePopover>
            <Cog6ToothIcon className="h-4 w-4 text-gray-100 md:h-5 md:w-5" />
          </BlueSimplePopover>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="end"
            sideOffset={10}
            className="flex max-w-xl flex-col divide-y divide-gray-900/10 rounded-xl border border-gray-900/10 bg-white shadow backdrop-blur-xl dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-800"
          >
            <div className="px-4 py-4">
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {lang === "en" ? "Settings" : "Paramètres"}
              </span>
            </div>

            <div className="flex flex-col gap-4 px-4 py-4">
              <div className="flex w-full items-center justify-between gap-24">
                <div>
                  <Popover.Root>
                    <Popover.Trigger className="inline-flex cursor-pointer items-center gap-1">
                      <InformationCircleIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {lang === "en" ? "Sort by" : "Trier par"}
                      </span>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        side="left"
                        align="center"
                        sideOffset={5}
                      >
                        <div className="flex max-w-xs flex-col rounded-xl bg-blue-500 p-2 text-center text-xs text-gray-100 shadow backdrop-blur-xl">
                          {lang === "en"
                            ? "Sort the route by the best output amount, the lowest gas price, or fastest time"
                            : "Trier la route par le meilleur montant de sortie, le prix de gaz le plus faible ou le temps le plus rapide"}
                        </div>
                        <Popover.Arrow className="fill-blue-500" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
                <Popover.Root>
                  <Popover.Trigger className="inline-flex items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {sort.charAt(0).toUpperCase() + sort.slice(1)}
                    </span>
                    <ChevronDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      side="bottom"
                      align="center"
                      sideOffset={5}
                    >
                      <div className="flex max-w-xl flex-col rounded-xl border border-gray-900/10 bg-white p-2 text-sm text-gray-700 shadow-lg backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-300">
                        <Popover.Close asChild>
                          <ul className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button onClick={() => setSort("output")}>
                              <li>
                                {lang === "en"
                                  ? "Maximum Return"
                                  : "Retour Maximum"}
                              </li>
                            </button>
                          </ul>
                        </Popover.Close>
                        <Popover.Close asChild>
                          <ul className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button onClick={() => setSort("time")}>
                              <li>
                                {lang === "en"
                                  ? "Fastest Time"
                                  : "Temps le plus rapide"}
                              </li>
                            </button>
                          </ul>
                        </Popover.Close>
                        <Popover.Close asChild>
                          <ul className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <button onClick={() => setSort("gas")}>
                              <li>
                                {lang === "en"
                                  ? "Lowest Fee"
                                  : "Frais les plus bas"}
                              </li>
                            </button>
                          </ul>
                        </Popover.Close>
                      </div>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              </div>

              <div className="flex w-full items-center justify-between gap-24">
                <div>
                  <Popover.Root>
                    <Popover.Trigger className="inline-flex cursor-pointer items-center gap-1">
                      <InformationCircleIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {lang === "en"
                          ? "Slippage tolerance"
                          : "Tolérance de glissement"}
                      </span>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        side="left"
                        align="center"
                        sideOffset={5}
                      >
                        <div className="flex max-w-xs flex-col rounded-xl bg-blue-500 p-2 text-center text-xs text-gray-100 shadow-lg backdrop-blur-xl">
                          {lang === "en"
                            ? "The maximum slippage you are willing to accept"
                            : "Le glissement maximal que vous êtes prêt à accepter"}
                        </div>
                        <Popover.Arrow className="fill-blue-500" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
                <ul className="inline-flex flex-wrap items-center gap-2">
                  <li>
                    <button
                      onClick={() => setSlippage("1")}
                      className={`${
                        slippage === "1"
                          ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                    >
                      1%
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSlippage("2")}
                      className={`${
                        slippage === "2"
                          ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                    >
                      2%
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSlippage("3")}
                      className={`${
                        slippage === "3"
                          ? "bg-gray-900 text-gray-300 hover:bg-gray-900 dark:bg-white dark:text-gray-700 dark:hover:bg-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                    >
                      3%
                    </button>
                  </li>
                </ul>
              </div>

              <div className="flex w-full items-center justify-between gap-24">
                <div>
                  <Popover.Root>
                    <Popover.Trigger className="inline-flex cursor-pointer items-center gap-1">
                      <InformationCircleIcon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {lang === "en" ? "Auto-refuel" : "Auto-ravitaillement"}
                      </span>
                    </Popover.Trigger>
                    <Popover.Portal>
                      <Popover.Content
                        side="left"
                        align="center"
                        sideOffset={5}
                      >
                        <div className="flex max-w-xs flex-col rounded-xl bg-blue-500 p-2 text-center text-xs text-gray-100 shadow-lg backdrop-blur-xl">
                          {lang === "en"
                            ? "Automatically top up the gas tank when it runs low"
                            : "Recharge automatiquement le réservoir de gaz lorsqu'il est faible"}
                        </div>
                        <Popover.Arrow className="fill-blue-500" />
                      </Popover.Content>
                    </Popover.Portal>
                  </Popover.Root>
                </div>
                <Switch.Root
                  checked={enableRefuel}
                  disabled={disableRefuel}
                  onCheckedChange={() => {
                    setEnableRefuel(!enableRefuel);
                    playAudio("blueButton");
                  }}
                  className={classNames(
                    enableRefuel
                      ? "bg-blue-500"
                      : "bg-gray-300 dark:bg-gray-700",
                    "relative h-[20px] w-[36px] cursor-default rounded-full bg-gray-100 outline-none data-[state=checked]:bg-blue-500 dark:bg-gray-700 dark:data-[state=checked]:bg-blue-500"
                  )}
                >
                  <Switch.Thumb className="block h-[15px] w-[15px] translate-x-1 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[18px]" />
                </Switch.Root>
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};

export default Settings;
