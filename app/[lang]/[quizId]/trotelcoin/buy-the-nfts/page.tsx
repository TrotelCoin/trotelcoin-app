"use client";

import type { Lang } from "@/types/language/lang";
import Course from "@/app/[lang]/components/courses/courseScreen/course";
import React, { useContext, useEffect, useState } from "react";
import Intermediate from "@/app/[lang]/premium/components/ranks/intermediate";
import Expert from "@/app/[lang]/premium/components/ranks/expert";
import PremiumContext from "@/contexts/premium";
import { useAccount } from "wagmi";

const CoursePage = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [condition, setCondition] = useState<boolean>(false);

  const { address } = useAccount();
  const { isIntermediate, isExpert } = useContext(PremiumContext);

  useEffect(() => {
    if (address && isIntermediate && isExpert) {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [isIntermediate, isExpert, address]);

  const cards = {
    en: [
      {
        title: "Introduction",
        text: "Two NFTs are up for grabs: Intermediate and Expert. Assume you have a crypto wallet and enough TrotelCoins.",
      },
      {
        title: "What are the roles of this NFTs?",
        text: "Don't worry about your lives with these NFTs. Moreover, certain courses are only for Intermediates or Experts. Also, exclusive gamification features require NFT ownership, like earning badges. Finally, Intermediates and Experts can test beta features.",
      },
      {
        title: "Intermediate",
        text: (
          <>
            <div className="flex flex-col gap-4 w-full">
              <Intermediate lang={lang} />
            </div>
          </>
        ),
      },
      {
        title: "Expert",
        text: (
          <>
            <div className="flex flex-col gap-4 w-full">
              <Expert lang={lang} />
            </div>
          </>
        ),
      },
    ],
    fr: [
      {
        title: "Introduction",
        text: "Deux NFT sont disponibles : Intermédiaire et Expert. Vous devrez avoir un portefeuille crypto et suffisamment de TrotelCoins.",
      },
      {
        title: "Quels sont les rôles de ces NFTs ?",
        text: "Ne vous souciez plus de vos vies avec ces NFTs. De plus, certains cours sont réservés uniquement aux Intermédiaires ou Experts. Aussi, des fonctionnalités exclusives de gamification nécessitent la possession de NFT, comme gagner des badges. Enfin, les Intermédiaires et Experts peuvent tester les fonctionnalités bêta.",
      },
      {
        title: "Intermédiaire",
        text: (
          <>
            <div className="flex flex-col gap-4 w-full">
              <Intermediate lang={lang} />
            </div>
          </>
        ),
      },
      {
        title: "Expert",
        text: (
          <>
            <div className="flex flex-col gap-4 w-full">
              <Expert lang={lang} />
            </div>
          </>
        ),
      },
    ],
  };

  return (
    <>
      <Course cards={cards} conditionIsOkay={condition} lang={lang} />
    </>
  );
};

export default CoursePage;
