import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass,
} from "@/lib/tailwind/evolution";
import React from "react";

const Evolution = ({ evolution }: { evolution: number }) => {
  return (
    <>
      <div className="p-2 absolute top-0 right-0">
        {Boolean(evolution) && (
          <>
            <span
              className={`${
                evolution === 0
                  ? neutralTextClass
                  : evolution < 0
                  ? negativeTextClass
                  : positiveTextClass
              }`}
            >
              {evolution === 0 ? "" : evolution < 0 ? "" : "+"}
              {evolution}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Evolution;
