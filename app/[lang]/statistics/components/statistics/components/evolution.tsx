import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass,
} from "@/lib/tailwind/evolution";
import React from "react";

const Evolution = ({
  evolution,
  percentage,
}: {
  evolution: number;
  percentage?: boolean;
}) => {
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
              {Number(evolution.toFixed(2))}
              {percentage ? "%" : ""}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Evolution;
