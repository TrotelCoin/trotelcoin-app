import React from "react";
import { Skeleton } from "@radix-ui/themes";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ItemSkeleton = () => {
  return (
    <>
      <div
        className={`overflow-hidden w-full h-full flex items-center justify-center rounded-xl bg-white dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 backdrop-blur-xl`}
      >
        <div className="px-4 py-5 sm:p-6 w-full">
          <div className="flex items-center justify-between w-full">
            <div
              className={`font-semibold text-gray-900 dark:text-gray-100 text-2xl`}
            >
              <Skeleton>Item Name</Skeleton>
            </div>
            <Skeleton>
              <InformationCircleIcon className="h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300" />
            </Skeleton>
          </div>
          <div className="inline-flex items-center gap-1">
            <Skeleton>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                <span>100</span>{" "}
              </span>
              <div className="block dark:hidden w-3 h-3">
                <Image
                  width={16}
                  height={16}
                  className="rounded-full"
                  aria-hidden="true"
                  alt="Token logo"
                  src="/assets/logo/trotelcoin.svg"
                />
              </div>
              <div className="hidden dark:block w-3 h-3">
                <Image
                  width={16}
                  height={16}
                  className="rounded-full"
                  aria-hidden="true"
                  alt="Token logo"
                  src="/assets/logo/trotelcoin-dark.jpg"
                />
              </div>{" "}
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

export default ItemSkeleton;
