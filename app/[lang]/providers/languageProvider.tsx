"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      const newPathname = pathname?.replace(/^\/(en|fr)/, "");
      if (savedLang === "fr") {
        router.replace(`/fr${newPathname}`);
      } else {
        router.replace(`/en${newPathname}`);
      }
    }
  }, []);

  return <>{children}</>;
};

export default LanguageProvider;
