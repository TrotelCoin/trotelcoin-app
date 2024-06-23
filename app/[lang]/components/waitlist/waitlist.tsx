"use client";

import React, { SVGProps, useContext, useEffect, useState } from "react";
import PremiumContext from "@/contexts/premium";
import { Lang } from "@/types/language/lang";
import Image from "next/image";
import Wallet from "@/app/[lang]/components/header/wallet";
import ThemeContext from "@/contexts/theme";
import { useAccount, useBlockNumber, useReadContract } from "wagmi";
import trotelCoinEarlyABI from "@/abi/polygon/premium/trotelCoinEarly";
import { contracts } from "@/data/web3/addresses";
import CountUp from "react-countup/";
import Link from "next/link";
import UserContext from "@/contexts/user";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";
import { Address } from "viem";
import { isMailCorrect } from "@/utils/waitlist/isMailCorrect";
import { handleNotify } from "@/utils/waitlist/handleNotify";
import useSWR from "swr";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import "animate.css";
import Loading from "@/app/[lang]/components/loading";
import ChainContext from "@/contexts/chain";

const discordIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 512"
    fill="currentColor"
    {...props}
  >
    <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
  </svg>
);
const twitterIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
  </svg>
);
const githubIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const socials = [
  {
    name: "Discord",
    href: "https://discord.gg/QaJafduNWC",
    icon: discordIcon
  },
  {
    name: "Twitter",
    href: "https://twitter.com/TrotelCoin",
    icon: twitterIcon
  },
  {
    name: "GitHub",
    href: "https://github.com/TrotelCoin",
    icon: githubIcon
  }
];

const Waitlist = ({
  children,
  lang
}: {
  children: React.ReactNode;
  lang: Lang;
}) => {
  const [early, setEarly] = useState<number | null>(null);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [mail, setMail] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<number | null>(null);
  const [length, setLength] = useState<number | null>(null);

  const { address } = useAccount();
  const { chain } = useContext(ChainContext);

  const { data: blockNumber } = useBlockNumber({
    watch: true,
    chainId: chain.id
  });

  const { isEarly } = useContext(PremiumContext);
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(UserContext);

  const { data: earlyData, refetch } = useReadContract({
    chainId: chain.id,
    abi: trotelCoinEarlyABI,
    address: contracts[chain.id].trotelCoinEarlyAddress,
    functionName: "totalSupply"
  });

  const { data: userWaitlistData, isLoading: isFetching } = useSWR(
    address ? `/api/user/waitlist?wallet=${address}` : null,
    fetcher,
    {
      refreshInterval: refreshIntervalTime,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      revalidateIfStale: true
    }
  );

  useEffect(() => {
    if (
      userWaitlistData &&
      userWaitlistData.position &&
      userWaitlistData.isWaiting
    ) {
      setPosition(userWaitlistData.position);
      setIsWaiting(userWaitlistData.isWaiting);
    } else {
      setPosition(0);
      setIsWaiting(false);
    }
  }, [userWaitlistData]);

  const { data: waitlistLengthData } = useSWR(`/api/waitlist/count`, fetcher, {
    refreshInterval: refreshIntervalTime,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true
  });

  useEffect(() => {
    if (waitlistLengthData) {
      setLength(waitlistLengthData);
    } else {
      setLength(0);
    }
  }, [waitlistLengthData]);

  useEffect(() => {
    if (earlyData) {
      const totalEarly = Number(earlyData);
      setEarly(totalEarly);
    } else {
      setEarly(0);
    }
  }, [earlyData]);

  useEffect(() => {
    refetch();
  }, [blockNumber, refetch]);

  useEffect(() => {
    if (mail && isMailCorrect(mail) && !isLoading) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [mail, isLoading]);

  if (isEarly) {
    return <>{children}</>;
  }

  return (
    <>
      {isFetching ? (
        <>
          <Loading lang={lang} />
        </>
      ) : (
        <>
          <nav className="animate__animated animate__fadeIn absolute flex w-full items-center justify-between px-5 py-5 md:px-12">
            <Link href={`/${lang}/home`}>
              {theme === "light" ? (
                <div className="block dark:hidden">
                  <Image
                    src="/assets/logo/trotelcoin-white.png"
                    alt="TrotelCoin logo"
                    width={48}
                    height={48}
                  />
                </div>
              ) : (
                <div className="hidden dark:block">
                  <Image
                    src="/assets/logo/trotelcoin.png"
                    alt="TrotelCoin logo"
                    width={48}
                    height={48}
                  />
                </div>
              )}
            </Link>
            <div className="inline-flex items-center gap-4">
              {socials.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="text-gray-700 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>
          {!isEarly && (
            <>
              <div className="flex h-screen items-center justify-center overflow-hidden bg-white text-center dark:bg-gray-900">
                <div className="mx-8 flex max-w-4xl flex-col gap-4">
                  {!isWaiting && (
                    <div className="flex justify-center">
                      <div className="animate__animated animate__bounceIn relative rounded-full px-3 py-1 text-xs leading-6 text-gray-700 ring-1 ring-gray-700 dark:text-gray-300 dark:ring-gray-300">
                        <span className="font-semibold">
                          {early ? (
                            <>
                              <CountUp start={0} end={early} suffix="+" />
                            </>
                          ) : (
                            <>0+</>
                          )}
                        </span>{" "}
                        {lang === "en" ? "learners already" : "étudiants déjà"}
                      </div>
                    </div>
                  )}
                  {!isWaiting && (
                    <span className="animate__animated animate__fadeIn text-5xl font-semibold text-gray-900 dark:text-gray-100 lg:text-6xl">
                      <>
                        <span className="text-blue-500 dark:text-blue-300">
                          Learn
                        </span>{" "}
                        &{" "}
                        <span className="text-yellow-500 dark:text-yellow-300">
                          Earn
                        </span>{" "}
                        Crypto.
                      </>
                    </span>
                  )}
                  {!isWaiting && (
                    <span className="animate__animated animate__fadeIn text-sm text-gray-700 dark:text-gray-300">
                      {lang === "en"
                        ? "Join the waitlist now to start learning."
                        : "Rejoignez la liste d'attente maintenant pour commencer à apprendre."}
                    </span>
                  )}
                  <div className={`${!isWaiting && "mt-4"}`}>
                    {isLoggedIn ? (
                      isWaiting ? (
                        <>
                          <div className="flex flex-col">
                            <span className="text-xl text-gray-900 dark:text-gray-100">
                              <span className="text-2xl font-semibold text-blue-500 dark:text-blue-300">
                                <CountUp
                                  start={0}
                                  end={position as number}
                                  prefix="#"
                                />
                              </span>{" "}
                              {lang === "en"
                                ? "in the waitlist"
                                : " dans la liste d'attente"}
                            </span>
                            <span className="text-xs text-gray-700 dark:text-gray-300">
                              {lang === "en"
                                ? "You will get an email when it's your turn!"
                                : "Vous recevrez un mail lorsque ce sera votre tour !"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col gap-4 md:flex-row">
                          <label htmlFor="email-address" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={mail ?? ""}
                            onChange={(e) => setMail(e.target.value)}
                            className="min-w-0 flex-auto rounded-xl border border-gray-900/10 bg-white px-3 py-2 text-gray-900 shadow placeholder:text-gray-300 focus:outline-none dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-700 sm:text-sm sm:leading-6"
                            placeholder={
                              lang === "en"
                                ? "Enter your email"
                                : "Entrez votre addresse mail"
                            }
                          />
                          <BlueButton
                            disabled={disabled}
                            isLoading={isLoading}
                            onClick={async () => {
                              const position = await handleNotify(
                                address as Address,
                                mail as string,
                                setIsLoading,
                                setErrorMessage,
                                setIsWaiting
                              );
                              setPosition(position);
                            }}
                            lang={lang}
                            text={lang === "en" ? "Notify me" : "Me notifier"}
                          />
                        </div>
                      )
                    ) : (
                      <Wallet lang={lang} />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="absolute bottom-0 w-full">
            <div className="mx-auto flex w-full items-center justify-center p-5 text-center">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-blue-500 dark:text-blue-300">
                  <CountUp start={0} end={length as number} />
                </span>{" "}
                {lang === "en" ? (
                  <>
                    <span className="text-blue-500 dark:text-blue-300">
                      future learners
                    </span>{" "}
                    in the waitlist
                  </>
                ) : (
                  <>
                    <span className="text-blue-500 dark:text-blue-300">
                      futurs étudiants
                    </span>{" "}
                    dans la liste d&apos;attente
                  </>
                )}
              </span>
            </div>
          </div>
        </>
      )}

      <FailNotification
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "An error occured, check your mail"
            : "Une erreur est survenue, vérifiez votre mail"
        }
        display={errorMessage}
        onClose={() => setErrorMessage(false)}
      />
    </>
  );
};

export default Waitlist;
