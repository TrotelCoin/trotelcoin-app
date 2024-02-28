"use client";

import "animate.css";
import React from "react";

const Loading = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex justify-center items-center h-screen animate__animated animate__flash animate__slower animate__infinite">
      TrotelCoin's courses are loading...
    </div>
  );
};

export default Loading;
