"use client";

import { Skeleton } from "@radix-ui/themes";
import React from "react";

const InventoryItemSkeleton = () => {
  return (
    <>
      <div
        className={`flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
      >
        <div className="w-full px-4 py-5 sm:p-6">
          <div className="flex w-full items-center justify-between">
            <div className={`rainbow-text text-2xl font-semibold`}>
              <Skeleton>Item name</Skeleton>
            </div>
            <Skeleton>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm text-gray-100">
                0
              </div>
            </Skeleton>
          </div>
          <div className="my-8 flex items-center justify-center">
            <span className="text-6xl">
              <Skeleton>🔗</Skeleton>
            </span>
          </div>
          <div className="flex flex-col">
            <Skeleton>
              <button className="rounded-full p-2 hover:bg-white dark:hover:bg-gray-800">
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
