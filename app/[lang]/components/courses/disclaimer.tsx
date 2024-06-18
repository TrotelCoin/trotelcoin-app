import type { Lang } from "@/types/language/lang";
import React from "react";

const Disclaimer = ({ lang }: { lang: Lang }) => {
  return (
    <>
      <p className="mb-10 text-sm font-light text-gray-900 dark:text-gray-100">
        <span className="font-semibold">Disclaimer: </span>
        {lang === "en"
          ? "None of our courses are financial advice. We are not responsible for any financial loss. Please do your own research."
          : "Aucun de nos cours n'est un conseil financier. Nous ne sommes pas responsables de toute perte financière. Veuillez faire vos propres recherches."}
      </p>
    </>
  );
};

export default Disclaimer;
