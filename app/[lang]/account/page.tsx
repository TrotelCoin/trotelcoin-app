"use client";

import React, { use, useContext, useEffect } from "react";

import { useAccount } from "wagmi";
import type { Lang } from "@/types/lang";
import LevelSection from "@/app/[lang]/account/components/level";
import HeaderSection from "@/app/[lang]/account/components/header";
import BadgesSection from "@/app/[lang]/account/components/badges";
import axios from "axios";
import Wallet from "@/app/[lang]/components/header/wallet";
import UserContext from "@/app/[lang]/contexts/userContext";

export default function Account({
  params: { lang },
}: {
  params: { lang: Lang };
}) {
  const { address } = useAccount();
  const { isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchNewLearner = async () => {
      await axios
        .post(`/api/database/postNewLearner?wallet=${address}`)
        .catch((error) => {
          console.error(error);
        });
    };

    if (address) {
      fetchNewLearner();
    }
  }, [address]);

  return (
    <>
      <div className="mx-auto">
        {isLoggedIn ? (
          <>
            <HeaderSection lang={lang} />
            <LevelSection lang={lang} />
            <BadgesSection lang={lang} />
          </>
        ) : (
          <>
            <div className="mx-auto flex justify-center items-center flex-col gap-4">
              <p className="text-center text-gray-900 dark:text-gray-100 text-xl">
                {lang === "en"
                  ? "You need to sign in."
                  : "Vous devez vous connecter."}
              </p>

              <Wallet isCentered={true} lang={lang} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
