"use client";

import { Colors } from "@/types/components/components";
import React from "react";
import Tilt from "react-parallax-tilt";
import { colorClass } from "@/style/colors";

const Action = ({ title, color }: { title: string; color: Colors }) => {
  return (
    <>
      <Tilt
        glareEnable={true}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        glareMaxOpacity={0.15}
        perspective={800}
        className="h-full"
      >
        <div
          className={`${colorClass(
            color
          )} flex h-full cursor-pointer items-center justify-center rounded-xl border-2 border-gray-900/50 p-8 text-center shadow-xl backdrop-blur-xl active:border-gray-900 dark:border-transparent`}
        >
          <div className={`text-4xl font-semibold text-gray-100`}>{title}</div>
        </div>
      </Tilt>
    </>
  );
};

export default Action;
