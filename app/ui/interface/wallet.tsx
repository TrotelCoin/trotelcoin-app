import React, { useState, useEffect } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import Success from "@/app/ui/modals/success";
import Fail from "@/app/ui/modals/fail";

export default function Wallet() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessage } = useSignMessage({
    message: "Log into the TrotelCoin platform.",
  });

  const [connect, setConnect] = useState<boolean>(false);
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
      setDisconnect(true);
    } catch (error) {
      setError(true);
      console.error("Disconnect error:", error);
    }
  };

  const handleAuth = async () => {
    try {
      const { account } = await connectAsync({
        connector: new InjectedConnector(),
      });

      signMessage();
      setConnect(true);
      console.log("Account has been connected:", account);
    } catch (error) {
      setError(true);
      console.error("Authentication error:", error);
    }
  };

  const closeSuccess = () => {
    setConnect(false);
  };

  const closeDisconnect = () => {
    setDisconnect(false);
  };

  const closeError = () => {
    setError(false);
  };

  // Use useEffect to trigger actions only when the component mounts initially
  useEffect(() => {
    // Check isConnected status on initial mount, set connect/disconnect state accordingly
    if (isConnected) {
      setConnect(true);
    } else {
      setDisconnect(true);
    }
  }, [isConnected]);

  // Return the component based on state
  if (isConnected) {
    return (
      <>
        <Success
          title="Connected"
          show={connect}
          message="You logged into TrotelCoin!"
          onClose={closeSuccess}
        />
        <Fail
          title="Connection error"
          show={error}
          message="Unknown error!"
          onClose={closeError}
        />
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
        <Success
          title="Disconnected"
          show={disconnect}
          message="You logged out of TrotelCoin!"
          onClose={closeDisconnect}
        />
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
