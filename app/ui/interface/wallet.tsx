import React from "react";
import { useConnect, useAccount } from "wagmi";

export default function Wallet() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const handleDisconnect = () => {
    // Disconnect logic if needed
  };

  const handleConnect = (connector: any) => {
    connect({ connector });
  };

  const { isConnected } = useAccount();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => handleConnect(connector)}
          disabled={!connector.ready}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {isConnected && (
        <div>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
