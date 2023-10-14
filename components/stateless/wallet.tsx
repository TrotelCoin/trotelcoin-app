import React, { useState } from "react";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import Success from "@/components/modals/success";
import Fail from "@/components/modals/fail";

export default function Wallet() {
  const { connectAsync, isSuccess: connectSuccess } = useConnect();
  const { disconnectAsync, isSuccess: isDisconnectSuccess } = useDisconnect();
  const { isConnected } = useAccount();
  const [connect, setConnect] = useState<boolean>(false);
  const [disconnect, setDisconnect] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  const handleDisconnect = async () => {
    disconnectAsync();

    if (isDisconnectSuccess) {
      setDisconnect(true);
    }
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

      if (connectSuccess) {
        setConnect(true);
      }

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
            title="Wallet connected"
            show={connect}
            message="You connected your wallet to the TrotelCoin dApp!"
            onClose={closeSuccess}
          />
        )}
        {error && (
          <Fail
            title="Connection error"
            show={error}
            message="An unknow error has happened during the connection!"
            onClose={closeError}
          />
        )}
        <div>
          <button
            className={`bg-yellow-200 border-2 border-gray-900 dark:hover:bg-yellow-50 dark:border-transparent hover:bg-yellow-100 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {disconnect && (
          <Success
            title="Wallet disconnected"
            show={disconnect}
            message="You disconnected your wallet to the TrotelCoin dApp!"
            onClose={closeDisconnect}
          />
        )}
        <div>
          <button
            className={`bg-yellow-200 dark:hover:bg-yellow-50 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleAuth}
          >
            Connect wallet
          </button>
        </div>
      </>
    );
  }
}
