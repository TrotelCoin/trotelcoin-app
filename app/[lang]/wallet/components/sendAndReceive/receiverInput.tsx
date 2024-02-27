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
  setReceiverAddress: (address: Address) => void;
  receiverAddressError: string;
}) => {
  return (
    <>
      <input
        type="text"
        className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 w-full p-2 border border-gray-900/20 dark:border-gray-100/20 rounded-lg"
        value={receiverAddress}
        onChange={(e) => setReceiverAddress(e.target.value as Address)}
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
