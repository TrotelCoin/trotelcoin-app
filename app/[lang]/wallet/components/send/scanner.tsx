import React from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { isAddress } from "viem";
import { XMarkIcon } from "@heroicons/react/24/solid";

const ScannerComponent = ({
  setRecipient,
  setErrorMessage,
  setShowScanner,
}: {
  setRecipient: React.Dispatch<React.SetStateAction<string | undefined>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setShowScanner: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="w-full max-w-md mx-auto z-50 flex bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-xl p-12 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="absolute top-0 right-0 flex p-2">
          <button
            type="button"
            className="inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => {
              setShowScanner(false);
            }}
          >
            <XMarkIcon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
          </button>
        </div>
        <Scanner
          onResult={(text: string) => {
            if (isAddress(text)) {
              setRecipient(text);
            } else {
              setErrorMessage(true);
            }
          }}
          onError={() => {
            setErrorMessage(true);
          }}
        />
      </div>
    </>
  );
};

export default ScannerComponent;
