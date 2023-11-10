import React, { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";

export default function Wallet() {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  const [showConnectors, setShowConnectors] = useState(false);

  const handleConnect = (connector: any) => {
    connect({ connector });
    setShowConnectors(false);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const { isConnected, isDisconnected } = useAccount();

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
                  {isLoading &&
                    pendingConnector &&
                    connector.id === pendingConnector.id &&
                    " (connecting)"}
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
