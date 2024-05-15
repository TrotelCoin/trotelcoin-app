import BlueSimplePopover from "@/app/[lang]/components/popovers/blueSimple";
import { Lang } from "@/types/language/lang";
import * as Switch from "@radix-ui/react-switch";
import * as Popover from "@radix-ui/react-popover";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import React, { useContext } from "react";
import { Sort } from "@/types/web3/swap";
import AudioContext from "@/contexts/audio";
import type { Slippage } from "@/types/web3/swap";
import * as Tooltip from "@radix-ui/react-tooltip";

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
  disableRefuel,
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
            <Cog6ToothIcon className="w-4 h-4 md:h-5 md:w-5 text-gray-100" />
          </BlueSimplePopover>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            side="bottom"
            align="end"
            sideOffset={10}
            className="max-w-xl flex shadow flex-col bg-white dark:bg-gray-800 divide-y divide-gray-900/10 dark:divide-gray-100/10 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl rounded-xl"
          >
            <div className="px-4 py-4">
              <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {lang === "en" ? "Settings" : "Paramètres"}
              </span>
            </div>

            <div className="flex flex-col gap-4 px-4 py-4">
              <div className="flex w-full justify-between items-center gap-24">
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root delayDuration={0}>
                      <Tooltip.Trigger className="inline-flex items-center gap-1 cursor-help">
                        <span className="text-gray-900 dark:text-gray-100 text-sm">
                          {lang === "en" ? "Sort by" : "Trier par"}
                        </span>
                        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="left"
                          align="center"
                          sideOffset={5}
                        >
                          <div className="max-w-xs text-xs text-gray-100 text-center flex shadow p-2 flex-col bg-blue-500 backdrop-blur-xl rounded-xl">
                            {lang === "en"
                              ? "Sort the route by the best output amount, the lowest gas price, or fastest time"
                              : "Trier la route par le meilleur montant de sortie, le prix de gaz le plus faible ou le temps le plus rapide"}
                          </div>
                          <Tooltip.Arrow className="fill-blue-500" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
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
                      <div className="max-w-xl text-sm text-gray-700 dark:text-gray-300 flex shadow-lg p-2 flex-col bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl rounded-xl">
                        <Popover.Close asChild>
                          <ul className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl">
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
                          <ul className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl">
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
                          <ul className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-xl">
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

              <div className="flex w-full justify-between items-center gap-24">
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root delayDuration={0}>
                      <Tooltip.Trigger className="inline-flex items-center gap-1 cursor-help">
                        <span className="text-gray-900 dark:text-gray-100 text-sm">
                          {lang === "en" ? "Slippage" : "Glissement"}{" "}
                        </span>
                        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="left"
                          align="center"
                          sideOffset={5}
                        >
                          <div className="max-w-xs text-xs text-gray-100 text-center flex shadow-lg p-2 flex-col bg-blue-500 backdrop-blur-xl rounded-xl">
                            {lang === "en"
                              ? "Maximum difference between expected and executed price"
                              : "Différence maximale entre le prix attendu et exécuté"}
                          </div>
                          <Tooltip.Arrow className="fill-blue-500" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
                <ul className="inline-flex flex-wrap gap-2 items-center">
                  <li>
                    <button
                      onClick={() => setSlippage("1")}
                      className={`${
                        slippage === "1"
                          ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                          : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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
                          ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                          : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
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
                          ? "bg-gray-900 hover:bg-gray-900 dark:bg-gray-50 dark:hover:bg-gray-50 text-gray-300 dark:text-gray-700"
                          : "bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                      } inline-flex items-center rounded-xl px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10`}
                    >
                      3%
                    </button>
                  </li>
                </ul>
              </div>

              <div className="flex w-full gap-24 justify-between items-center">
                <div>
                  <Tooltip.Provider>
                    <Tooltip.Root delayDuration={0}>
                      <Tooltip.Trigger className="inline-flex items-center gap-1 cursor-help">
                        <span className="text-gray-900 dark:text-gray-100 text-sm">
                          {lang === "en"
                            ? "Enable Refuel"
                            : "Activer le Refuel"}{" "}
                        </span>
                        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="left"
                          align="center"
                          sideOffset={5}
                        >
                          <div className="max-w-xs text-xs text-gray-100 text-center flex shadow-lg p-2 flex-col bg-blue-500 backdrop-blur-xl rounded-xl">
                            {lang === "en"
                              ? "When you move tokens to a new chain, you may not have the native token for transactions. Refuel allows to request funds or bridge the token from another chain"
                              : "Lorsque vous transférez des jetons vers une nouvelle chaîne, vous pourriez ne pas détenir le jeton natif pour les transactions. Refuel permet de demander des fonds ou transférer le jeton depuis une autre chaîne"}
                          </div>
                          <Tooltip.Arrow className="fill-blue-500" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
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
                    "w-[36px] h-[20px] bg-gray-100 dark:bg-gray-700 rounded-full relative data-[state=checked]:bg-blue-500 dark:data-[state=checked]:bg-blue-500 outline-none cursor-default"
                  )}
                >
                  <Switch.Thumb className="block w-[15px] h-[15px] bg-gray-50 rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-[18px]" />
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
