import type { Lang } from "@/types/language/lang";
import { Transition, Dialog } from "@headlessui/react";
import { useAccount } from "wagmi";
import React, { Fragment, useEffect, useState } from "react";
import "animate.css";
import axios from "axios";
import BlueButton from "@/app/[lang]/components/buttons/blue";

const NameModal = ({
  lang,
  name,
  setName,
  setNameModal,
  nameModal
}: {
  lang: Lang;
  name: string | null;
  setName: (name: string | null) => void;
  setNameModal: (nameModal: boolean) => void;
  nameModal: boolean;
}) => {
  const [nameError, setNameError] = useState<string | null>(null);
  const [nameIsLoading, setNameIsLoading] = useState<boolean>(false);

  const { address } = useAccount();

  useEffect(() => {
    if (name) {
      if (name.length > 25) {
        setNameError(
          lang === "en" ? "Name is too long" : "Le nom est trop long"
        );
      } else if (name.length < 3) {
        setNameError(
          lang === "en" ? "Name is too short." : "Le nom est trop court."
        );
      } else {
        setNameError(null);
      }
    }
  }, [name, lang, setNameError]);

  const postName = async (name: string) => {
    setNameIsLoading(true);
    if (!name) {
      setNameError(lang === "en" ? "Name is required." : "Le nom est requis.");
      setNameIsLoading(false);
      return;
    }

    if (!address) {
      setNameError(
        lang === "en" ? "Something went wrong." : "Une erreur est survenue."
      );
      setNameIsLoading(false);
      return;
    }

    if (nameError === null) {
      await axios
        .post(`/api/database/postUsername`, {
          name: name,
          wallet: address
        })
        .then((response) => {
          localStorage.setItem("username", name);
          setNameIsLoading(false);
          setNameModal(false);
        })
        .catch((error) => {
          console.error(error);
          setNameError(
            lang === "en"
              ? "Something went wrong."
              : "Quelque chose a mal tourné."
          );
          setNameModal(false);
          setName(null);
          setNameError(null);
          setNameIsLoading(false);
        });
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
          className="fixed inset-0 z-50 m-auto flex h-screen items-center justify-center"
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
            <div className="fixed inset-0 bg-white/10 backdrop-blur-sm transition-opacity dark:bg-gray-700/10" />
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
                <Dialog.Panel className="relative my-8 w-full max-w-sm transform overflow-hidden rounded-xl border border-gray-900/10 bg-white p-6 px-4 pb-4 pt-5 text-left backdrop-blur-xl transition-all dark:border-gray-100/10 dark:bg-gray-800">
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
                      value={name ?? ""}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border-gray-900/10 shadow-sm focus:ring-1 focus:ring-blue-500 dark:border-gray-100/10 dark:focus:ring-blue-300"
                    />
                    {nameError && (
                      <p className="mt-2 text-sm text-red-500">{nameError}</p>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6">
                    <BlueButton
                      onClick={() => {
                        setName(null);
                        setNameModal(false);
                      }}
                      lang={lang}
                      isFull={true}
                      text={lang === "en" ? "Close" : "Fermer"}
                    />

                    <BlueButton
                      onClick={() => postName(name as string)}
                      isFull={true}
                      lang={lang}
                      text={lang === "en" ? "Save" : "Sauvegarder"}
                      isLoading={nameIsLoading}
                    />
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
