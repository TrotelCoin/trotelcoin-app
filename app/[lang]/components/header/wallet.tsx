import { useWeb3Modal, useWeb3ModalTheme } from "@web3modal/wagmi/react";
import React, { useContext, useEffect } from "react";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import type { Lang } from "@/types/language/lang";
import AudioContext from "@/contexts/audio";
import { useAccount, useDisconnect, useChainId, useSignMessage } from "wagmi";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import UserContext from "@/contexts/user";
import ThemeContext from "@/contexts/theme";
import axios from "axios";

const Wallet = ({
  lang,
  isFull,
  isCentered
}: {
  lang: Lang;
  isFull?: boolean;
  isCentered?: boolean;
}) => {
  const { open } = useWeb3Modal();
  const { setThemeMode } = useWeb3ModalTheme();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);
  const chainId = useChainId();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  const { playAudio } = useContext(AudioContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setThemeMode(theme);
  }, [theme, setThemeMode]);

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
          "Sign in to the TrotelCoin app. This will allow you to access your account and perform transactions. This operation is free of charge.",
        uri: window.location.origin,
        version: "1",
        chainId: chainId,
        nonce: await getCsrfToken()
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage()
      });
      signIn("credentials", {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl
      });
    } catch (error) {
      window.alert(error);
    }

    await axios.post(`/api/learner?wallet=${address}`).catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
      {address && !session && (
        <>
          <BlueButton
            lang={lang}
            onClick={() => handleLogin()}
            isFull={isFull}
            text={lang === "en" ? "Log in" : "S'identifier"}
          />
        </>
      )}
      {isLoggedIn && (
        <>
          <BlueButton
            lang={lang}
            onClick={() => handleDisconnect()}
            isFull={isFull}
            text={lang === "en" ? "Sign out" : "Déconnexion"}
          />
        </>
      )}
      {!address && (
        <>
          <div
            className={`w-full ${
              isCentered && "mx-auto flex items-center justify-center"
            }`}
            onClick={() => playAudio("blueButton")}
          >
            <button
              className={`${
                isFull && "w-full"
              } rounded-xl border-b-4 border-blue-700 bg-blue-500 px-6 py-2 text-center text-sm font-semibold text-gray-100 backdrop-blur-xl hover:bg-blue-500/80 active:mt-1 active:border-none`}
              onClick={() => open()}
            >
              {lang === "en" ? "Connect" : "Se connecter"}
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
      csrfToken: await getCsrfToken(context)
    }
  };
}

export default Wallet;
