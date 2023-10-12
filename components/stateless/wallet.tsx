import React, { useEffect, useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  // Initialize a state variable to track the wallet connection status.
  const [walletConnected, setWalletConnected] = useState(isConnected);

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  useEffect(() => {
    const storedWalletAccount = localStorage.getItem("walletAccount");

    if (storedWalletAccount) {
      // If wallet connection information is found in local storage, mark the wallet as connected.
      setWalletConnected(true);
    }
  }, []);

  const handleDisconnect = async () => {
    // Clear the stored wallet connection information
    localStorage.removeItem("walletAccount");
    setWalletConnected(false); // Mark the wallet as disconnected
    disconnectAsync();
  };

  const handleAuth = async () => {
    const storedWalletAccount = localStorage.getItem("walletAccount");

    if (storedWalletAccount) {
      // If wallet information is found in local storage, skip the authentication process.
      setWalletConnected(true);
    } else {
      try {
        const { account, chain } = await connectAsync({
          connector: new InjectedConnector(),
        });

        // Store the wallet connection information
        localStorage.setItem("walletAccount", JSON.stringify(account));
        setWalletConnected(true);

        const signedMessage = await signMessage();
        localStorage.setItem("signedMessage", "true");

        console.log("Authenticated account:", account);
        console.log("Selected chain:", chain);
        console.log("Signed message:", signedMessage);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };

  if (walletConnected) {
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
