import React, { useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import Success from "@/app/ui/modals/success";
import Fail from "@/app/ui/modals/fail";

export default function Wallet() {
  const { connectAsync, isSuccess: connectSuccess } = useConnect();
  const { disconnectAsync, isSuccess: isDisconnectSuccess } = useDisconnect();
  const { isConnected } = useAccount();
  const [connect, setConnect] = useState<boolean>(false);
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { isSuccess, signMessage } = useSignMessage({
    message: "Log into the TrotelCoin platform.",
  });

  const handleDisconnect = async () => {
    disconnectAsync();

    setDisconnect(true);
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

  if (isConnected) {
    return (
      <>
        {connect && (
          <Success
            title="Connected"
            show={connect}
            message="You logged into TrotelCoin !"
            onClose={closeSuccess}
          />
        )}
        {error && (
          <Fail
            title="Connection error"
            show={error}
            message="Unknown error !"
            onClose={closeError}
          />
        )}
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
        {disconnect && (
          <Success
            title="Disconnected"
            show={disconnect}
            message="You logged out of TrotelCoin !"
            onClose={closeDisconnect}
          />
        )}
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
