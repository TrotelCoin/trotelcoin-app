"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainComponent from "@/app/[lang]/main";
import { usePathname } from "next/navigation";

const RouterComponent = ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
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
