import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass,
} from "@/lib/tailwind/evolution";
import React from "react";
import "animate.css";
import { loadingFlashClass } from "@/lib/tailwind/loading";

const Evolution = ({
  evolution,
  percentage,
}: {
  evolution: number;
  percentage?: boolean;
}) => {
  return (
    <>
      <div className="p-2 absolute top-0 right-0 animate__animated animate__fadeIn">
        {Boolean(evolution) && (
          <>
            <span
              className={`text-sm ${loadingFlashClass} ${
                evolution === 0
                  ? neutralTextClass
                  : evolution < 0
                  ? negativeTextClass
                  : positiveTextClass
              }`}
            >
              {evolution === 0 ? "" : evolution < 0 ? "" : "+"}
              {Number(evolution.toFixed(1))}
              {percentage ? "%" : ""}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Evolution;
