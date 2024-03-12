import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import React, { useContext, useRef } from "react";
import ThemeContext from "@/app/[lang]/contexts/themeContext";
import BlueButton from "@/app/[lang]/components/blueButton";
import { Lang } from "@/types/types";
import AudioContext from "@/app/[lang]/contexts/audioContext";

const Wallet = ({
  lang,
  isFull,
  isCentered,
}: {
  lang: Lang;
  isFull?: boolean;
  isCentered?: boolean;
}) => {
  const { isLoggedIn } = useUser();
  const address = useAddress();
  const disconnect = useDisconnect();
  const { logout } = useLogout();
  const { theme } = useContext(ThemeContext);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { audioEnabled } = useContext(AudioContext);

  const handleDisconnect = () => {
    if (address) {
      disconnect();
      logout();
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

      {address && isLoggedIn ? (
        <>
          <BlueButton
            lang={lang}
            onClick={handleDisconnect}
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
            <ConnectWallet
              theme={theme === "light" ? "light" : "dark"}
              auth={{ loginOptional: false }}
              switchToActiveChain={true}
              modalSize={"wide"}
              modalTitleIconUrl={""}
              btnTitle={lang === "en" ? "Connect wallet" : "Se connecter"}
              className={`connectWalletButton`}
              style={{
                width: isFull ? "100%" : "auto",
                minWidth: 0,
                borderBottomWidth: "0.25rem",
                borderBottomColor: "#1d4ed8",
                borderBottomStyle: "solid",
                backgroundColor: "#3b82f6",
                color: "#f3f4f6",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: "600",
                borderRadius: "0.75rem",
                backdropFilter: "blur(24px)",
                paddingLeft: "1.5rem",
                paddingRight: "1.5rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                textAlign: "center",
                fontFamily: "Poppins, sans-serif",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Wallet;
