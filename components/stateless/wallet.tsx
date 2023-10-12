import React, { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { SignInResponse, signIn } from "next-auth/react";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  const handleDisconnect = async () => {
    disconnectAsync();
  };

  const handleAuth = async () => {
    try {
      // Assuming `connectAsync` returns a Promise
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      // Assuming `signMessage` is a function that returns a Promise
      const signedMessage = await signMessage();

      // Process the authentication response and signed message here
      console.log("Authenticated account:", account);
      console.log("Selected chain:", chain);
      console.log("Signed message:", signedMessage);

      // Additional authentication logic, e.g., sending the signed message to the server
    } catch (error) {
      // Handle any errors that occur during authentication
      console.error("Authentication error:", error);
      // You can also display an error message to the user.
    }
  };

  if (isConnected) {
    return (
      <div>
        <button
          className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover:bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={handleDisconnect}
        >
          Disconnect
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
