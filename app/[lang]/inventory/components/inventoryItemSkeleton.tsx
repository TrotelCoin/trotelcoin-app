"use client";

import { Skeleton } from "@radix-ui/themes";
import React from "react";

const InventoryItemSkeleton = () => {
  return (
    <>
      <div
        className={`overflow-hidden w-full h-full flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl`}
      >
        <div className="px-4 py-5 sm:p-6 w-full">
          <div className="flex items-center justify-between w-full">
            <div className={`font-semibold rainbow-text text-2xl`}>
              <Skeleton>Item name</Skeleton>
            </div>
            <Skeleton>
              <div className="w-6 h-6 rounded-full bg-blue-500 text-gray-100 flex justify-center items-center text-sm">
                0
              </div>
            </Skeleton>
          </div>
          <div className="flex items-center justify-center my-8">
            <span className="text-6xl">
              <Skeleton>🔗</Skeleton>
            </span>
          </div>
          <div className="flex flex-col">
            <Skeleton>
              <button className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full">
                Use Item
              </button>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryItemSkeleton;
