import React, { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  useEffect(() => {
    // Check if there is a signed message stored in local storage
    const storedSignedMessage = localStorage.getItem("signedMessage");

    if (storedSignedMessage) {
      // If a signed message is found, we can update the app state
      // and use it as needed.
      // For example, by setting a state variable to indicate that a message is signed.
    }
  }, []);

  const handleDisconnect = async () => {
    // Clear the stored wallet connection information
    localStorage.removeItem("walletAccount");

    disconnectAsync();
  };

  const handleAuth = async () => {
    try {
      const { account, chain } = await connectAsync({
        connector: new InjectedConnector(),
      });

      // Store the wallet connection information
      localStorage.setItem("walletAccount", JSON.stringify(account));

      const signedMessage = await signMessage();

      // Store a flag indicating that a message is signed
      localStorage.setItem("signedMessage", "true");

      console.log("Authenticated account:", account);
      console.log("Selected chain:", chain);
      console.log("Signed message:", signedMessage);

      // Additional authentication logic, e.g., sending the signed message to the server
    } catch (error) {
      console.error("Authentication error:", error);
      // We can display an error message to the user.
    }
  };

  if (isConnected) {
    return (
      <div>
        <button
          className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
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
          className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={handleAuth}
        >
          Connect wallet
        </button>
      </div>
    );
  }
}
