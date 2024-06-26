"use client";

import type { Lang } from "@/types/language/lang";
import React from "react";
import claimingRewardsFee from "@/data/rewards/claimingFee";

const Fee = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div className="flex justify-between">
        <span>{lang === "en" ? "Fee" : "Frais"}</span>
        <div>{claimingRewardsFee} WMATIC</div>
      </div>
    </>
  );
};

export default Fee;
