import {
  neutralTextClass,
  negativeTextClass,
  positiveTextClass
} from "@/style/evolution";
import React from "react";
import "animate.css";
import { Skeleton } from "@radix-ui/themes";

const Evolution = ({
  evolution,
  percentage,
  isLoading
}: {
  evolution: number;
  percentage?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <>
      <div className="animate__animated animate__fadeIn absolute right-0 top-0 px-2 py-1">
        {evolution !== null ? (
          <>
            {evolution !== 0 && (
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
                  {Number(evolution.toFixed(2))}
                  {percentage ? "%" : ""}
                </span>
              </>
            )}
          </>
        ) : (
          <>
            <Skeleton>
              <span className="text-xs">0%</span>
            </Skeleton>
          </>
        )}
      </div>
    </>
  );
};

export default Evolution;
