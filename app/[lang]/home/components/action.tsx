"use client";

import { Colors } from "@/types/components/components";
import React from "react";
import Tilt from "react-parallax-tilt";
import { colorClass } from "@/lib/tailwind/colors";

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
          )} text-center h-full shadow-xl flex items-center justify-center cursor-pointer active:border-gray-900 border-2 border-gray-900/50 dark:border-transparent backdrop-blur-xl rounded-xl p-8`}
        >
          <div className={`font-semibold text-4xl text-gray-100`}>{title}</div>
        </div>
      </Tilt>
    </>
  );
};

export default Action;
