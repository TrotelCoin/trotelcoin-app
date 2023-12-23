import React from "react";
import Intermediate from "@/app/ui/premium/intermediate";
import Expert from "@/app/ui/premium/expert";

const Subscription = () => {
  return (
    <>
      <div className="flex flex-col my-20 max-w-4xl mx-auto">
        <h1 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          Claim your NFTs
        </h1>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 gap-6">
          <Intermediate />
          <Expert />
        </div>
      </div>
    </>
  );
};

export default Subscription;
