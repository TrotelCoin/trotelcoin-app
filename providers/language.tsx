"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) {
      const newPathname = pathname?.replace(/^\/(en|fr)/, "");
      const queryString = searchParams?.toString();
      const newAsPath = queryString
        ? `${newPathname}?${queryString}`
        : newPathname;
      if (savedLang === "fr") {
        router.push(`/fr${newAsPath}`);
      } else {
        router.push(`/en${newAsPath}`);
      }
    }
  }, []);

  return <>{children}</>;
};

export default LanguageProvider;
