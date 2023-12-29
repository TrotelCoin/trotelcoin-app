"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainComponent from "@/app/[lang]/main";
import { Lang } from "@/types/types";

const RouterComponent = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) => {
  const router = useRouter();

  return (
    <>
      <MainComponent router={router} lang={lang}>
        {children}
      </MainComponent>
    </>
  );
};

export default RouterComponent;
