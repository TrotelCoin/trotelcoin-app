import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const { isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  const handleDisconnect = async () => {
    disconnectAsync();
  };

  const handleAuth = async () => {
    try {
      const { account } = await connectAsync({
        connector: new InjectedConnector(),
      });

      if (localStorage.getItem("signedMessage") !== "true") {
        signMessage();
      }

      if (isSuccess) {
        localStorage.setItem("signedMessage", "true");
      }

      console.log("Account has been connected:", account);
    } catch (error) {
      console.error("Authentication error:", error);
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
