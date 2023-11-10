import React, { useState, useEffect } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function Wallet() {
  const [showConnectors, setShowConnectors] = useState(false);

  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = (connector: any) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
      return;
    }
    setShowConnectors(false);
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const { isConnected, isDisconnected, isConnecting } = useAccount();

  return (
    <>
      {isDisconnected && (
        <div className="relative inline-block">
          <button
            className="text-sm font-semibold rounded-full px-6 py-2 bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900"
            onClick={() => setShowConnectors(!showConnectors)}
          >
            Connect wallet
          </button>

          {showConnectors && (
            <div className="absolute divide-y divide-gray-900/10 dark:divide-gray-100/10 top-10 left-0 z-10 bg-white dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 rounded-lg">
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleConnect(connector)}
                  disabled={!connector.ready}
                >
                  {connector.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isConnected && (
        <div>
          <button
            className="text-sm font-semibold rounded-full px-6 py-2 bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900"
            onClick={handleDisconnect}
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
}
