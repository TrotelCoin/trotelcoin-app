"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";
import BlueButton from "@/app/[lang]/components/buttons/blue";

const GetStarted = ({
  lang,
  setFullScreen
}: {
  lang: Lang;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <BlueButton
        text={lang === "en" ? "Launch the course" : "Lancer le cours"}
        lang={lang}
        onClick={() => setFullScreen(true)}
      />
    </>
  );
};

export default GetStarted;
