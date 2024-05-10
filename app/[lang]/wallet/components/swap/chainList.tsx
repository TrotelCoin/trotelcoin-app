import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Lang } from "@/types/lang";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import type { Chain } from "@/types/web3/chain";
import type { ChainSource } from "@/types/web3/swap";
import { CheckIcon } from "@heroicons/react/24/solid";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

const ChainList = ({
  lang,
  setFromChain,
  setToChain,
  fromChains,
  toChains,
  chainList,
  openChainList,
  setOpenChainList,
  fromChain,
  toChain,
}: {
  lang: Lang;
  setFromChain: React.Dispatch<React.SetStateAction<Chain>>;
  setToChain: React.Dispatch<React.SetStateAction<Chain>>;
  fromChains: Chain[];
  toChains: Chain[];
  chainList: ChainSource;
  openChainList: boolean;
  setOpenChainList: React.Dispatch<React.SetStateAction<boolean>>;
  fromChain: Chain;
  toChain: Chain;
}) => {
  const [query, setQuery] = useState("");

  const chains: Chain[] = chainList === "from" ? fromChains : toChains;

  const filteredChains = chains.filter(
    (chain: Chain) =>
      chain.name.toLowerCase().includes(query.toLowerCase()) ||
      chain.chainId.toString().toLowerCase().includes(query.toLowerCase()) ||
      chain.currency.address.toLowerCase().includes(query.toLowerCase()) ||
      chain.currency.symbol.toLowerCase().includes(query.toLowerCase()) ||
      chain.currency.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Transition.Root
      show={openChainList}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenChainList(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 lg:p-36">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto text-gray-900 dark:text-gray-100 max-w-xl transform divide-y divide-gray-900/10 dark:divide-gray-100/10 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800 shadow-2xl border border-gray-900/10 dark:border-gray-100/10 transition-all">
              <Combobox>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-700 dark:text-gray-300"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-700 dark:placeholder:text-gray-300 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredChains.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredChains.map((chain: Chain, index: number) => (
                      <Combobox.Option
                        key={index}
                        value={chain.name}
                        onClick={() => {
                          if (chainList === "from") {
                            setFromChain(chain);
                          } else {
                            setToChain(chain);
                          }
                          setOpenChainList(false);
                        }}
                        className={({ active }) =>
                          classNames(
                            "flex cursor-pointer select-none rounded-xl p-3",
                            active && "bg-gray-100 dark:bg-gray-700"
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="flex justify-between items-center w-full">
                              <div
                                className={classNames(
                                  "flex h-10 w-10 flex-none items-center justify-center rounded-xl",
                                  chain.icon
                                )}
                              >
                                <img
                                  width={48}
                                  height={48}
                                  className="rounded-full"
                                  aria-hidden="true"
                                  alt="Chain logo"
                                  src={chain.icon}
                                />
                              </div>
                              <div className="ml-4 flex-auto">
                                <p
                                  className={classNames(
                                    "text-sm font-medium",
                                    active
                                      ? "text-gray-900 dark:text-gray-100"
                                      : "text-gray-700 dark:text-gray-300"
                                  )}
                                >
                                  {chain.name}
                                </p>
                                <p
                                  className={classNames(
                                    "text-sm",
                                    active
                                      ? "text-gray-700 dark:text-gray-300"
                                      : "text-gray-700 dark:text-gray-300"
                                  )}
                                >
                                  {chain.currency.symbol}
                                </p>
                              </div>
                              {((chain.chainId === fromChain.chainId &&
                                chainList === "from") ||
                                (chain.chainId === toChain.chainId &&
                                  chainList === "to")) && (
                                <CheckIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                              )}
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredChains.length === 0 && (
                  <div className="px-6 py-14 text-center text-sm sm:px-14">
                    <ExclamationCircleIcon
                      type="outline"
                      name="exclamation-circle"
                      className="mx-auto h-6 w-6 text-gray-700 dark:text-gray-300"
                    />
                    <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                      {lang === "en" ? "No results found" : "Pas de résultat"}
                    </p>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "No tokens were found"
                        : "Aucun token n'a été trouvé"}
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ChainList;
