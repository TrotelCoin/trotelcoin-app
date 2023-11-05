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
          className={`bg-blue-600 dark:hover:bg-blue-600/80 hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={handleDisconnect}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className={`bg-blue-600 hover:bg-blue-600/80 dark:hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-100 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
          onClick={handleAuth}
        >
          Log in
        </button>
      </div>
    );
  }
}
