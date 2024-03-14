import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useContext } from "react";
import BlueButton from "@/app/[lang]/components/blueButton";
import { Lang } from "@/types/types";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import { useAccount, useDisconnect, useChainId, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";

const Wallet = ({
  lang,
  isFull,
  isCentered,
}: {
  lang: Lang;
  isFull?: boolean;
  isCentered?: boolean;
}) => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const { playAudio } = useContext(AudioContext);

  const handleDisconnect = () => {
    if (address) {
      disconnect();
    }
  };

  const handleLogin = async () => {
    try {
      const callbackUrl = "/protected";
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement:
          "Sign in with your wallet to the TrotelCoin app. This will allow you to access your account and perform transactions. This operation is free of charge.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
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
      {address && isConnected && !session && (
        <>
          <BlueButton
            lang={lang}
            onClick={() => handleLogin()}
            isFull={isFull}
            text={lang === "en" ? "Sign in" : "Connexion"}
          />
        </>
      )}
      {address && isConnected && session && (
        <>
          <BlueButton
            lang={lang}
            onClick={() => handleDisconnect()}
            isFull={isFull}
            text={lang === "en" ? "Sign out" : "Déconnexion"}
          />
        </>
      )}
      {(!address || !isConnected) && (
        <>
          <div
            className={`w-full ${
              isCentered && "mx-auto flex justify-center items-center"
            }`}
            onClick={() => playAudio("blueButton")}
          >
            <button
              className={`${
                isFull && "w-full"
              } text-center border-b-4 active:border-none active:mt-1 text-sm font-semibold rounded-xl text-gray-100 backdrop-blur-xl px-6 py-2 bg-blue-500 hover:bg-blue-500/80 border-blue-700`}
              onClick={() => open()}
            >
              {lang === "en"
                ? "Connect wallet"
                : "Connectez votre portefeuille"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Wallet;
