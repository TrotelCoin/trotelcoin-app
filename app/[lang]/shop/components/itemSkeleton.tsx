import React from "react";
import { Skeleton } from "@radix-ui/themes";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ItemSkeleton = () => {
  return (
    <>
      <div
        className={`flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-gray-900/10 bg-white backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800`}
      >
        <div className="w-full px-4 py-5 sm:p-6">
          <div className="flex w-full items-center justify-between">
            <Skeleton>
              <div
                className={`text-2xl font-semibold text-gray-900 dark:text-gray-100`}
              >
                Item Name
              </div>
            </Skeleton>
            <Skeleton>
              <InformationCircleIcon className="h-6 w-6 cursor-pointer text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300" />
            </Skeleton>
          </div>

          <div className="inline-flex items-center gap-1">
            <Skeleton>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                <span>100</span>{" "}
              </span>{" "}
            </Skeleton>
            <Skeleton>
              <div className="block h-3 w-3 dark:hidden">
                <Image
                  width={16}
                  height={16}
                  className="rounded-full"
                  aria-hidden="true"
                  alt="Token logo"
                  src="/assets/logo/trotelcoin.svg"
                />
              </div>
            </Skeleton>
            <Skeleton>
              <div className="hidden h-3 w-3 dark:block">
                <Image
                  width={16}
                  height={16}
                  className="rounded-full"
                  aria-hidden="true"
                  alt="Token logo"
                  src="/assets/logo/trotelcoin-dark.jpg"
                />
              </div>
            </Skeleton>{" "}
          </div>
          <div className="my-8 flex items-center justify-center">
            <Skeleton>
              {" "}
              <span className="text-6xl">🔗</span>
            </Skeleton>
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

export default ItemSkeleton;
