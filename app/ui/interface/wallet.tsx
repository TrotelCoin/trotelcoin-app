import React from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { unstable_noStore as noStore } from "next/cache";

export default function Wallet() {
  noStore();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const handleAuth = async () => {
    try {
      const { account } = await connectAsync({
        connector: new InjectedConnector(),
      });

      console.log("Account has been connected:", account);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  // Return the component based on state
  if (isConnected) {
    return (
      <>
        <div>
          <button
            className={`bg-blue-200 dark:hover:bg-blue-200/80 hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleDisconnect}
          >
            Sign out
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <button
            className={`bg-blue-200 dark:hover:bg-blue-200/80 hover:bg-blue-200/80 dark:hover-bg-blue-50 text-sm px-6 py-2 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleAuth}
          >
            Log in
          </button>
        </div>
      </>
    );
  }
}
