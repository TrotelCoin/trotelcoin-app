import React from "react";
import { useWallet } from "@/lib/walletContext";

export default function Wallet() {
  const { isConnected, connectWallet, disconnectWallet } = useWallet();

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const handleAuth = () => {
    connectWallet();
  };

  // Return the component based on state
  if (isConnected) {
    return (
      <div>
        <button
          className={`bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold wallet-button`}
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
          className={`bg-blue-600 dark:bg-blue-200 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 px-6 py-2 text-sm text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-100 rounded-full font-semibold wallet-button`}
          onClick={handleAuth}
        >
          Connect wallet
        </button>
      </div>
    );
  }
}
