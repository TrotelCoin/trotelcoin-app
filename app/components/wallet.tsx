import React, { Fragment } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { polygon } from "wagmi/chains";
import { Menu, Transition } from "@headlessui/react";

export default function Wallet() {
  const { connect, connectors } = useConnect({ chainId: polygon.id });
  const { disconnect } = useDisconnect();
  const { isConnected, isDisconnected, isConnecting } = useAccount();

  const handleConnect = (connector: any) => {
    try {
      connect({ connector });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <>
      {isDisconnected && (
        <div className="relative z-50 inline-block">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="text-sm font-semibold rounded-full px-6 py-2 bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900">
                  Connect wallet
                </Menu.Button>

                <Transition
                  show={open}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="absolute p-2 mt-4 right-0 bg-white dark:bg-slate-800 border border-gray-900/10 dark:border-gray-100/10 rounded-lg"
                  >
                    {connectors.map((connector, index) => (
                      <Menu.Item key={connector.id}>
                        {({ active }) => (
                          <button
                            className={`block w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700 ${
                              !connector.ready ? "cursor-not-allowed" : ""
                            } rounded-lg`}
                            onClick={() => {
                              handleConnect(connector);
                              // Close the menu after selecting a wallet
                            }}
                            disabled={!connector.ready}
                          >
                            {connector.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      )}

      {isConnecting && (
        <div className="relative inline-block">
          <button className="text-sm font-semibold rounded-full px-6 py-2 bg-blue-600 dark:bg-blue-200 text-gray-100 dark:text-gray-900">
            Connecting...
          </button>
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
