import { Lang } from "@/types/lang";
import React from "react";
import ComingSoon from "@/app/[lang]/components/comingSoon/comingSoon";

const SubmitACourse = ({ params: { lang } }: { params: { lang: Lang } }) => {
  return (
    <>
      <div className="mx-auto flex flex-col justify-center max-w-xl w-full items-center">
        <div className="flex flex-col w-full gap-2 px-4">
          <span className="text-2xl font-bold">
            {lang === "en" ? "Submit a course" : "Proposer un cours"}
          </span>
          <ComingSoon lang={lang} />
        </div>
      </div>
    </>
  );
};

export default SubmitACourse;
