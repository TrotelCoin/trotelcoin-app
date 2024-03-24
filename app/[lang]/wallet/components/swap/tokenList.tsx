import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Lang } from "@/types/lang";
import type { Token } from "@/types/web3/token";
import type { TokenSource } from "@/types/web3/swap";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getBalance } from "@wagmi/core";
import { type GetBalanceReturnType } from "@wagmi/core";
import { useAccount } from "wagmi";
import { config } from "@/config/Web3ModalConfig";
import { Address } from "viem";
import { nativeAddress } from "@/data/web3/tokens";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

const TokenList = ({
  lang,
  setFromToken,
  setToToken,
  fromTokens,
  toTokens,
  tokenList,
  openTokenList,
  setOpenTokenList,
}: {
  lang: Lang;
  setFromToken: React.Dispatch<React.SetStateAction<Token>>;
  setToToken: React.Dispatch<React.SetStateAction<Token>>;
  fromTokens: Token[];
  toTokens: Token[];
  tokenList: TokenSource;
  openTokenList: boolean;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState("");

  const { address } = useAccount();

  const tokens: Token[] = tokenList === "from" ? fromTokens : toTokens;

  useEffect(() => {
    if (address) {
      tokens.map(async (token: Token, index: number) => {
        if (token.address === nativeAddress) {
          const balance: GetBalanceReturnType = await getBalance(config, {
            chainId: token.chainId,
            address: address,
          });

          if (balance) token.balance = Number(balance?.formatted);
        } else {
          const balance: GetBalanceReturnType = await getBalance(config, {
            token: token.address,
            chainId: token.chainId,
            address: address,
          });

          if (balance) token.balance = Number(balance?.formatted);
        }

        return token;
      });
    } else {
      tokens.map((token: Token, index: number) => {
        token.balance = 0;
        return token;
      });
    }
  }, [fromTokens, toTokens, tokenList, address]);

  const filteredTokens = tokens
    .filter(
      (token: Token) =>
        token.symbol.toLowerCase().includes(query.toLowerCase()) ||
        token.name.toLowerCase().includes(query.toLowerCase()) ||
        token.address.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a: Token, b: Token) => (b.balance as number) - (a.balance as number))
    .slice(0, 100);

  return (
    <Transition.Root
      show={openTokenList}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenTokenList(false)}
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
            <Dialog.Panel className="mx-auto text-gray-900 dark:text-gray-100 max-w-xl transform divide-y divide-gray-900/10 dark:divide-gray-100/10 overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-900/10 dark:border-gray-100/10 transition-all">
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

                {filteredTokens.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                  >
                    {filteredTokens.map((token: Token, index: number) => (
                      <Combobox.Option
                        key={index}
                        value={token.symbol}
                        onClick={() => {
                          if (tokenList === "from") {
                            setFromToken(token);
                          } else {
                            setToToken(token);
                          }
                          setOpenTokenList(false);
                        }}
                        className={({ active }) =>
                          classNames(
                            "flex cursor-pointer select-none rounded-xl p-3",
                            active && "bg-gray-100 dark:bg-gray-800"
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="flex justify-between items-end w-full">
                              <div
                                className={classNames(
                                  "flex h-10 w-10 flex-none items-center justify-center rounded-xl",
                                  token.logoURI
                                )}
                              >
                                {token.name === "TrotelCoin" ? (
                                  <>
                                    <div className="block dark:hidden">
                                      <Image
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        aria-hidden="true"
                                        alt="Token logo"
                                        src={token.lightLogoURI as string}
                                      />
                                    </div>
                                    <div className="hidden dark:block">
                                      <Image
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        aria-hidden="true"
                                        alt="Token logo"
                                        src={token.darkLogoURI as string}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <img
                                    width={48}
                                    height={48}
                                    className="rounded-full"
                                    aria-hidden="true"
                                    alt="Token logo"
                                    src={token.logoURI}
                                  />
                                )}
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
                                  {token.name}
                                </p>
                                <p
                                  className={classNames(
                                    "text-sm",
                                    active
                                      ? "text-gray-700 dark:text-gray-300"
                                      : "text-gray-700 dark:text-gray-300"
                                  )}
                                >
                                  {token.symbol}
                                </p>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300 text-xs">
                                {lang === "en" ? "Balance:" : "Solde:"}{" "}
                                {token.balance
                                  ? token.balance?.toLocaleString("en-US")
                                  : "0"}
                              </span>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredTokens.length === 0 && (
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

export default TokenList;
