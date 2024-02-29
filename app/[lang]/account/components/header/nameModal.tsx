import { Lang } from "@/types/types";
import { Transition, Dialog } from "@headlessui/react";
import { useAddress } from "@thirdweb-dev/react";
import React, { Fragment, useEffect, useState } from "react";
import "animate.css";

const NameModal = ({
  lang,
  name,
  setName,
  setNameModal,
  nameModal,
}: {
  lang: Lang;
  name: string | null;
  setName: (name: string | null) => void;
  setNameModal: (nameModal: boolean) => void;
  nameModal: boolean;
}) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameIsLoading, setNameIsLoading] = useState<boolean>(false);

  const address = useAddress();

  useEffect(() => {
    if (name) {
      if (name.length > 25) {
        setNameError(
          lang === "en" ? "Name is too long" : "Le nom est trop long"
        );
      } else if (name.includes(" ")) {
        setNameError(
          lang === "en"
            ? "Name cannot contain spaces"
            : "Le nom ne peut pas contenir d'espaces"
        );
      } else if (name.length < 3) {
        setNameError(
          lang === "en" ? "Name is too short." : "Le nom est trop court."
        );
      } else {
        setNameError(null);
      }
    }
  }, [name]);

  const postName = async (name: string) => {
    setNameIsLoading(true);
    if (name === "") {
      setNameError(lang === "en" ? "Name is required." : "Le nom est requis.");
    }

    if (!address) {
      setNameError(
        lang === "en" ? "Something went wrong." : "Une erreur est survenue."
      );
    }

    if (nameError === null) {
      try {
        await fetch(
          `/api/database/postUsername?name=${name}&wallet=${address}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            cache: "no-store",
          }
        );
        setNameModal(false);
        setName(null);
        setNameError(null);
        setNameIsLoading(false);
        localStorage.setItem("username", name);
      } catch (error) {
        setNameError(
          lang === "en"
            ? "Something went wrong."
            : "Quelque chose a mal tourné."
        );
        console.error(error);
        setNameModal(false);
        setName(null);
        setNameError(null);
        setNameIsLoading(false);
        return;
      }
    } else {
      setNameError(
        lang === "en" ? "Name is not valid." : "Le nom n'est pas valide."
      );
      setNameIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <Transition.Root show={nameModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-50 items-center justify-center h-screen m-auto"
          onClose={() => setNameModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-sm bg-white/10 dark:bg-gray-700/10 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-xl backdrop-blur-xl border border-gray-900/10 dark:border-gray-100/10 bg-white dark:bg-gray-800 px-4 pb-4 pt-5 text-left transition-all my-8 w-full max-w-sm p-6">
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                      >
                        {lang === "en"
                          ? "Please enter your name"
                          : "Veuillez entrer votre nom"}
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <input
                      type="text"
                      value={name as string}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border-gray-900/10 dark:border-gray-100/10 shadow-sm focus:ring-1 focus:ring-blue-500"
                    />
                    {nameError && (
                      <p className="text-red-500 text-sm mt-2">{nameError}</p>
                    )}
                  </div>

                  <div className="mt-5 sm:mt-6 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => postName(name as string)}
                      className={`w-full justify-center rounded-full bg-blue-500 hover:bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-100 ${
                        nameIsLoading &&
                        "animate__animated animate__flash animate__infinite animate__slower"
                      }`}
                    >
                      {lang === "en"
                        ? nameIsLoading
                          ? "Loading..."
                          : "Save"
                        : nameIsLoading
                        ? "Chargement..."
                        : "Sauvegarder"}
                    </button>
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-full bg-blue-500 hover:bg-blue-400 px-3 py-2 text-sm font-semibold text-gray-100"
                      onClick={() => {
                        setName(null);
                        setNameModal(false);
                      }}
                    >
                      {lang === "en" ? "Close" : "Fermer"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default NameModal;
