"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MainComponent from "@/app/[lang]/main";
import { usePathname } from "next/navigation";

const RouterComponent = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  let lang = pathname?.split("/")[1];

  return (
    <>
      <MainComponent children={children} router={router} />
    </>
  );
};

export default RouterComponent;
