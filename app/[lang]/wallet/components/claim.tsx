import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon";
import { Lang } from "@/types/types";

const Claim = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <div>
        <ComingSoon lang={lang} />
      </div>
    </>
  );
};

export default Claim;
