import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { isAddress } from "viem";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Lang } from "@/types/language/lang";
import ModalContainer from "@/app/[lang]/components/modals/container";
import { Dialog } from "@headlessui/react";
import Success from "@/app/[lang]/components/modals/success";
import Fail from "@/app/[lang]/components/modals/fail";

const ScannerComponent = ({
  lang,
  setRecipient,
  errorMessage,
  setErrorMessage,
  showScanner,
  setShowScanner,
}: {
  lang: Lang;
  setRecipient: React.Dispatch<React.SetStateAction<string | undefined>>;
  errorMessage: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
  showScanner: boolean;
  setShowScanner: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [scannedMessage, setScannedMessage] = useState<boolean>(false);

  return (
    <>
      <ModalContainer
        showScanner={showScanner}
        onClose={() => setShowScanner(false)}
      >
        <Dialog.Panel className="w-full max-w-md mx-auto z-50 flex flex-col gap-2 bg-white border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-xl p-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <div className="flex flex-col items-start w-full">
            <div className="flex justify-between w-full">
              <span className="text-2xl font-bold">
                {lang === "en" ? "Scan" : "Scan"}
              </span>
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
          </div>
          <div className={`${errorMessage || scannedMessage ? "hidden" : ""}`}>
            <Scanner
              onResult={(text: string) => {
                if (isAddress(text)) {
                  setRecipient(text);
                  setScannedMessage(true);
                } else {
                  setErrorMessage(true);
                }
              }}
              onError={() => {
                setErrorMessage(true);
              }}
            />
          </div>
        </Dialog.Panel>
      </ModalContainer>

      <Success
        show={scannedMessage}
        lang={lang}
        onClose={() => setScannedMessage(false)}
        title={lang === "en" ? "Address scanned" : "Addresse scannée"}
        message={
          lang === "en"
            ? "You have scanned the address"
            : "Vous avez scanné l'addresse"
        }
      />
      <Fail
        show={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "An error occured" : "Une erreur est survenue"}
      />
    </>
  );
};

export default ScannerComponent;
