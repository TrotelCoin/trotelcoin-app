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
            title="Connexion réussie"
            show={connect}
            message="Vous avez connecté votre portefeuille à la dApp TrotelCoin !"
            onClose={closeSuccess}
          />
        )}
        {error && (
          <Fail
            title="Erreur de connexion"
            show={error}
            message="Une erreur inconnue est apparue pendant la connexion !"
            onClose={closeError}
          />
        )}
        <div>
          <button
            className={`bg-yellow-200 dark:hover:bg-yellow-100/80 hover:bg-yellow-200/80 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleDisconnect}
          >
            Déconnexion
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
        {disconnect && (
          <Success
            title="Déconnexion"
            show={disconnect}
            message="Vous avez déconnecté votre portefeuille à la dApp TrotelCoin !"
            onClose={closeDisconnect}
          />
        )}
        <div>
          <button
            className={`bg-yellow-200 dark:hover:bg-yellow-100/80 hover:bg-yellow-200/80 dark:hover-bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
            onClick={handleAuth}
          >
            Connexion
          </button>
        </div>
      </>
    );
  }
}
