import { Lang } from "@/types/types";
import React from "react";
import { Address } from "viem";

const ReceiverInput = ({
  lang,
  receiverAddress,
  setReceiverAddress,
  receiverAddressError,
}: {
  lang: Lang;
  receiverAddress: Address;
  setReceiverAddress: any;
  receiverAddressError: string;
}) => {
  return (
    <>
      <input
        type="text"
        className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300 w-full p-2 border border-gray-900/20 dark:border-gray-100/20 rounded-lg"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value)}
        placeholder={lang === "en" ? "Receiver" : "Destinataire"}
      ></input>
      {receiverAddressError && (
        <div className="mt-2">
          <span className="text-red-500 dark:text-red-300">
            {receiverAddressError}
          </span>
        </div>
      )}
    </>
  );
};

export default ReceiverInput;