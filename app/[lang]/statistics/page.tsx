"use client";

import { Lang } from "@/types/lang";
import React from "react";
import TheAlgorithm from "@/app/[lang]/statistics/components/TheAlgorithm";

const Statistics = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <TheAlgorithm lang={lang} />
    </>
  );
};

export default Statistics;
