import React, { useState } from "react";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { isAddress } from "viem";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Lang } from "@/types/language/lang";
import ModalContainer from "@/app/[lang]/components/modals/container";
import { Dialog } from "@headlessui/react";
import SuccessNotification from "@/app/[lang]/components/modals/notifications/success";
import FailNotification from "@/app/[lang]/components/modals/notifications/fail";

const ScannerComponent = ({
  lang,
  setRecipient,
  errorMessage,
  setErrorMessage,
  showScanner,
  setShowScanner
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
        <Dialog.Panel className="z-50 mx-auto flex w-full max-w-md flex-col gap-2 rounded-xl border border-gray-900/10 bg-white p-4 text-gray-900 backdrop-blur-xl dark:border-gray-100/10 dark:bg-gray-800 dark:text-gray-100">
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full justify-between">
              <span className="text-2xl font-bold">
                {lang === "en" ? "Scan" : "Scan"}
              </span>
              <button
                type="button"
                className="inline-flex rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => {
                  setShowScanner(false);
                }}
              >
                <XMarkIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
              </button>
            </div>
          </div>
          <div className={`${errorMessage || scannedMessage ? "hidden" : ""}`}>
            <Scanner
              onScan={(detectedCodes: IDetectedBarcode[]) => {
                if (isAddress(detectedCodes[0].rawValue)) {
                  setRecipient(detectedCodes[0].rawValue);
                  setScannedMessage(true);
                } else {
                  setErrorMessage(true);
                }
              }}
            />
          </div>
        </Dialog.Panel>
      </ModalContainer>

      <SuccessNotification
        display={scannedMessage}
        lang={lang}
        onClose={() => setScannedMessage(false)}
        title={lang === "en" ? "Address scanned" : "Addresse scannée"}
        message={
          lang === "en"
            ? "You have scanned the address"
            : "Vous avez scanné l'addresse"
        }
      />
      <FailNotification
        display={errorMessage}
        lang={lang}
        onClose={() => setErrorMessage(false)}
        title={lang === "en" ? "Error" : "Erreur"}
        message={lang === "en" ? "An error occured" : "Une erreur est survenue"}
      />
    </>
  );
};

export default ScannerComponent;
