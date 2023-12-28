"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainComponent from "@/app/[lang]/main";
import { usePathname } from "next/navigation";
import { Lang } from "@/types/types";

const RouterComponent = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Lang;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <MainComponent children={children} router={router} lang={lang} />
    </>
  );
};

export default RouterComponent;
