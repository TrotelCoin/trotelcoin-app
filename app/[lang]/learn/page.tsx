"use client";

import React from "react";
import ComingSoon from "@/app/[lang]/ui/interface/comingSoon";
import { Lang } from "@/types/types";

const Learn = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <ComingSoon lang={lang} />
    </>
  );
};

export default Learn;
