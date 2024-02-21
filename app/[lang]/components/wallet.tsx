"use client";

import React, { useEffect, useState } from "react";
import { useConnect, useAccount, useDisconnect, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { polygon } from "wagmi/chains";
import { Menu, Transition } from "@headlessui/react";
import { DictType, Lang } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";

export default function Wallet({ lang }: { lang: Lang }) {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const { connect, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { address, isConnected, isDisconnected, isConnecting } = useAccount();
  const { data: session, status } = useSession();

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

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with your wallet to the TrotelCoin's app.",
        uri: window.location.origin,
        version: "1",
        chainId: polygon.id,
        nonce: await getCsrfToken(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <>
      {isDisconnected && (
        <div className="relative z-50 inline-block">
          <Menu>
            {({ open }) => (
              <>
                <Menu.Button className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900">
                  {typeof dict?.wallet !== "string" && (
                    <>{dict?.wallet.connect}</>
                  )}
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
                    className="absolute p-2 mt-4 right-0 bg-white dark:bg-gray-900 border border-gray-900/10 dark:border-gray-100/10 rounded-lg"
                  >
                    {connectors.map((connector, index) => (
                      <Menu.Item key={connector.id}>
                        {({ active }) => (
                          <button
                            className={`block w-full px-4 py-2 text-left text-sm text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg`}
                            onClick={() => {
                              handleConnect(connector);
                              // Close the menu after selecting a wallet
                            }}
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
          <button className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900">
            {typeof dict?.wallet !== "string" && <>{dict?.wallet.connecting}</>}
          </button>
        </div>
      )}

      {isConnected && !session && (
        <div className="relative inline-block">
          <button
            className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
            onClick={handleLogin}
          >
            {typeof dict?.wallet !== "string" && <>{dict?.wallet.signin}</>}
          </button>
        </div>
      )}

      {isConnected && session && (
        <div>
          <button
            className="text-sm font-semibold rounded-full px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-gray-100 dark:text-gray-900"
            onClick={handleDisconnect}
          >
            {typeof dict?.wallet !== "string" && <>{dict?.wallet.disconnect}</>}
          </button>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
