import { useWeb3Modal } from "@web3modal/wagmi/react";
import React, { useContext, useRef } from "react";
import BlueButton from "@/app/[lang]/components/blueButton";
import { Lang } from "@/types/types";
import AudioContext from "@/app/[lang]/contexts/audioContext";
import { useAccount, useDisconnect } from "wagmi";

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

  const audioRef = useRef<HTMLAudioElement>(null);

  const { audioEnabled } = useContext(AudioContext);

  const handleDisconnect = () => {
    if (address) {
      disconnect();
    }
  };

  const playAudio = () => {
    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/sounds/blue-button.wav" />

      {address && isConnected ? (
        <>
          <BlueButton
            lang={lang}
            onClick={() => handleDisconnect()}
            isFull={true}
            text={lang === "en" ? "Sign out" : "Déconnexion"}
          />
        </>
      ) : (
        <>
          <div
            className={`w-full ${
              isCentered && "mx-auto flex justify-center items-center"
            }`}
            onClick={() => playAudio()}
          >
            <button
              className={`${
                isFull && "w-full"
              } text-center border-b-4 active:border-none active:mt-1 text-sm font-semibold rounded-xl text-gray-100 backdrop-blur-xl px-6 py-2 bg-blue-500 hover:bg-blue-500/80 border-blue-700`}
              onClick={() => open()}
            >
              {lang === "en" ? "Connect wallet" : "Connectez son portefeuille"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Wallet;
