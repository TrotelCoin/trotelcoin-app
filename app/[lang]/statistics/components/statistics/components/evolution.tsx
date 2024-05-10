import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass,
} from "@/style/evolution";
import React from "react";
import "animate.css";

const Evolution = ({
  evolution,
  percentage,
}: {
  evolution: number;
  percentage?: boolean;
}) => {
  return (
    <>
      <div className="px-2 py-1 absolute top-0 right-0 animate__animated animate__fadeIn">
        {Boolean(evolution) && (
          <>
            <span
              className={`text-xs ${
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
