import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass,
} from "@/style/evolution";
import React from "react";
import "animate.css";
import { Skeleton } from "@radix-ui/themes";

const Evolution = ({
  evolution,
  percentage,
  isLoading,
}: {
  evolution: number;
  percentage?: boolean;
  isLoading: boolean;
}) => {
  return (
    <>
      <div className="px-2 py-1 absolute top-0 right-0 animate__animated animate__fadeIn">
        {evolution && !isLoading ? (
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
        ) : (
          <>
            <span className="text-xs">
              <Skeleton>0%</Skeleton>
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Evolution;
