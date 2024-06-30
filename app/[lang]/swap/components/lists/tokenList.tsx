import { Fragment, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Lang } from "@/types/language/lang";
import type { Token } from "@/types/web3/token";
import type { TokenSource } from "@/types/web3/swap";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { getBalance } from "@wagmi/core";
import { type GetBalanceReturnType } from "@wagmi/core";
import { useAccount } from "wagmi";
import { config } from "@/config/Web3ModalConfig";
import Pagination from "@/app/[lang]/swap/components/pagination";
import { nativeAddress } from "@/data/web3/tokens";
import { Skeleton } from "@radix-ui/themes";
import { formatUnits } from "viem";
import { roundPrice } from "@/utils/price/roundPrice";

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

const tokensPerPage = 100;

const TokenList = ({
  lang,
  setFromToken,
  setToToken,
  fromTokens,
  toTokens,
  tokenList,
  openTokenList,
  setOpenTokenList,
  setIsLoadingTokensBalance
}: {
  lang: Lang;
  setFromToken: React.Dispatch<React.SetStateAction<Token>>;
  setToToken: React.Dispatch<React.SetStateAction<Token>>;
  fromTokens: Token[];
  toTokens: Token[];
  tokenList: TokenSource;
  openTokenList: boolean;
  setOpenTokenList: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingTokensBalance: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { address } = useAccount();

  const tokens: Token[] = tokenList === "from" ? fromTokens : toTokens;

  useEffect(() => {
    if (address) {
      setIsLoadingTokensBalance(true);

      tokens.map(async (token: Token, index: number) => {
        if (token.address === nativeAddress) {
          const balance: GetBalanceReturnType = await getBalance(config, {
            chainId: token.chainId,
            address: address
          });

          if (balance)
            token.balance = roundPrice(
              Number(formatUnits(balance?.value ?? 0, token.decimals))
            );
        } else {
          const balance: GetBalanceReturnType = await getBalance(config, {
            token: token.address,
            chainId: token.chainId,
            address: address
          });

          if (balance)
            token.balance = roundPrice(
              Number(formatUnits(balance?.value ?? 0, token.decimals))
            );
        }

        setIsLoadingTokensBalance(false);
        return token;
      });
    } else {
      tokens.map((token: Token, index: number) => {
        token.balance = 0;
        return token;
      });
    }
  }, [
    fromTokens,
    toTokens,
    tokenList,
    address,
    setIsLoadingTokensBalance,
    tokens
  ]);

  const filteredTokens = tokens
    .filter(
      (token: Token) =>
        token.symbol.toLowerCase().includes(query.toLowerCase()) ||
        token.name.toLowerCase().includes(query.toLowerCase()) ||
        token.address.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a: Token, b: Token) => (b.balance as number) - (a.balance as number))
    .slice((currentPage - 1) * tokensPerPage, tokensPerPage * currentPage);

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
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-900/10 overflow-hidden rounded-xl border border-gray-900/10 bg-white text-gray-900 shadow-2xl transition-all dark:divide-gray-100/10 dark:border-gray-100/10 dark:bg-gray-900 dark:text-gray-100">
              <Combobox>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-700 dark:text-gray-300"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-700 focus:ring-0 dark:text-gray-100 dark:placeholder:text-gray-300 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredTokens.length > 0 ? (
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
                            active && "bg-gray-100 dark:bg-gray-700"
                          )
                        }
                      >
                        {({ active }) => (
                          <>
                            <div className="flex w-full items-end justify-between">
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
                                  <>
                                    {Boolean(token.logoURI) && (
                                      <img
                                        width={48}
                                        height={48}
                                        className="rounded-full"
                                        aria-hidden="true"
                                        alt="Token logo"
                                        src={token.logoURI}
                                      />
                                    )}
                                  </>
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
                              <Skeleton loading={token.balance === undefined}>
                                <span className="text-xs text-gray-700 dark:text-gray-300">
                                  {lang === "en" ? "Balance:" : "Solde:"}{" "}
                                  {token.balance
                                    ? token.balance > 1
                                      ? token.balance?.toLocaleString("en-US")
                                      : token.balance
                                    : "0"}
                                </span>
                              </Skeleton>
                            </div>
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                ) : (
                  <>
                    <Combobox.Options
                      static
                      className="max-h-96 transform-gpu scroll-py-3 overflow-y-auto p-3"
                    >
                      {Array.from({ length: 20 }).map((_, index) => (
                        <Combobox.Option
                          key={index}
                          value="Loading..."
                          className={
                            "flex cursor-pointer select-none rounded-xl p-3"
                          }
                        >
                          <>
                            <div className="flex w-full items-end justify-between">
                              <div
                                className={
                                  "flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-full"
                                }
                              >
                                <Skeleton width="48px" height="48px" />
                              </div>

                              <div className="ml-4 flex-auto">
                                <Skeleton>
                                  <p
                                    className={
                                      "text-sm font-medium text-gray-700 dark:text-gray-300"
                                    }
                                  >
                                    TrotelCoin
                                  </p>
                                </Skeleton>
                                <Skeleton>
                                  <p
                                    className={
                                      "text-sm text-gray-700 dark:text-gray-300"
                                    }
                                  >
                                    TROTEL
                                  </p>
                                </Skeleton>
                              </div>
                              <Skeleton>
                                <span className="text-xs text-gray-700 dark:text-gray-300">
                                  {lang === "en" ? "Balance: 0" : "Solde: 0"}{" "}
                                </span>
                              </Skeleton>
                            </div>
                          </>
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </>
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

              {filteredTokens.length > 0 && (
                <Pagination
                  lang={lang}
                  list={tokens}
                  filteredList={filteredTokens}
                  page={currentPage}
                  setPage={setCurrentPage}
                  itemsPerPage={tokensPerPage}
                />
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TokenList;
