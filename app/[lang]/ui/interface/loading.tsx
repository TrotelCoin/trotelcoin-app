"use client";

import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-bounce">
        <Image
          width={128}
          height={128}
          alt="TrotelCoin Logo"
          src="/assets/logo/trotelcoin-white.png"
        ></Image>
      </div>
    </div>
  );
};

export default Loading;
