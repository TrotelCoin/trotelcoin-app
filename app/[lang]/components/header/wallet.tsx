import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useLogout,
  useUser,
} from "@thirdweb-dev/react";
import React from "react";
import { DictType, Lang } from "@/types/types";
import { useTheme } from "@/app/[lang]/components/selectors/themeSelector";

const Wallet = ({ dict, lang }: { dict: DictType; lang: Lang }) => {
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
        <button
          onClick={handleDisconnect}
          className="text-sm font-semibold rounded-full px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
          style={{ minWidth: "0px" }}
        >
          {lang === "en" ? "Sign out" : "Déconnexion"}
        </button>
      ) : (
        <ConnectWallet
          theme={isLightTheme ? "light" : "dark"}
          auth={{ loginOptional: false }}
          switchToActiveChain={true}
          modalSize={"wide"}
          modalTitleIconUrl={""}
          btnTitle={lang === "en" ? "Sign in" : "Connexion"}
          className="text-sm font-semibold rounded-full px-4 py-2 bg-gray-900 dark:bg-white hover:bg-gray-700 dark:hover:bg-gray-300 text-gray-100 dark:text-gray-900"
          style={{ minWidth: "0px" }}
        />
      )}
    </>
  );
};

export default Wallet;
