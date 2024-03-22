import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";
import { Lang } from "@/types/lang";

const Inventory = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto max-w-md flex flex-col gap-4">
        <span className="text-2xl font-semibold">
          {lang === "en" ? "Inventory" : "Inventaire"}
        </span>

        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Inventory;
