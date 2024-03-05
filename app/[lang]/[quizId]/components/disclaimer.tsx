import { DictType } from "@/types/types";
import React from "react";

const Disclaimer = ({ dict }: { dict: DictType }) => {
  return (
    <>
      <p className="mb-10 text-sm text-gray-900 dark:text-gray-100 font-light">
        <span className="font-semibold">Disclaimer: </span>
        {typeof dict?.lesson !== "string" && <>{dict?.lesson.disclaimer}</>}
      </p>
    </>
  );
};

export default Disclaimer;
