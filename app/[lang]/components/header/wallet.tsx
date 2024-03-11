import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import React from "react";
import { useTheme } from "@/app/[lang]/components/selectors/themeSelector";
import BlueButton from "@/app/[lang]/components/blueButton";
import { Lang } from "@/types/types";

const Wallet = ({ lang }: { lang: Lang }) => {
  const { isLoggedIn } = useUser();
  const address = useAddress();
  const disconnect = useDisconnect();
  const { logout } = useLogout();

  const isLightTheme = useTheme();

  const handleDisconnect = () => {
    if (address) {
      disconnect();
      logout();
    }
  };

  return (
    <>
      {address && isLoggedIn ? (
        <>
          <BlueButton
            onClick={handleDisconnect}
            text={lang === "en" ? "Sign out" : "Déconnexion"}
          />
        </>
      ) : (
        <ConnectWallet
          theme={isLightTheme ? "light" : "dark"}
          auth={{ loginOptional: false }}
          switchToActiveChain={true}
          modalSize={"wide"}
          modalTitleIconUrl={""}
          btnTitle={lang === "en" ? "Connect wallet" : "Se connecter"}
          className="!min-w-0 !border-b-4 active:!border-none active:!mt-1 !text-sm !font-semibold !justify-center !rounded-xl !text-gray-100 !backdrop-blur-xl !px-6 !py-2 !bg-blue-500 hover:!bg-blue-500/80 !border-blue-700"
        />
      )}
    </>
  );
};

export default Wallet;
