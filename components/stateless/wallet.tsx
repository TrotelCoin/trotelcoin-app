import React, { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { useRouter } from "next/router";
import { SignInResponse, signIn } from "next-auth/react";
import Router from "next/router";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });

    const { message } = (await requestChallengeAsync({
      address: account,
      chainId: chain.id,
    })) as { id: string; profileId: string; message: string };

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = (await signIn("moralis-auth", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    })) as SignInResponse;
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url as string);
  };

  if (isConnected) {
    return (
      <div>
        <button
          className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover:bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={() => Router.push("/user")}
        >
          My wallet
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover:bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={handleAuth}
        >
          Connect wallet
        </button>
      </div>
    );
  }
}
