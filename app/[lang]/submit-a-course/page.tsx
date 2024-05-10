"use client";

import { Lang } from "@/types/language/lang";
import Link from "next/link";
import React, { useState } from "react";
import BasicInformations from "./components/basicInformations";
import { Transition } from "@headlessui/react";
import type { Category, Subcategory } from "@/types/courses/categories";
import type { Tiers } from "@/types/premium/premium";
import { useAccount } from "wagmi";
import { Address } from "viem";

const SubmitACourse = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<Category>("Web3");
  const [subcategory, setSubcategory] =
    useState<Subcategory>("Cryptocurrencies");
  const [tier, setTier] = useState<Tiers>("Beginner");

  const { address } = useAccount();

  const handlePrevious = () => {
    if (currentPage <= 0) {
      return;
    }

    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage >= 3) {
      return;
    }

    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      <div className="mx-auto flex flex-col justify-center max-w-xl w-full items-center text-gray-900 dark:text-gray-100">
        <Transition
          show={currentPage === 0}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-semibold">
                {lang === "en"
                  ? "Let's start with some informations."
                  : "Commençons par quelques informations."}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en" ? (
                  <>
                    Learn more about submitting a course by clicking{" "}
                    <Link
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
                      href={`https://docs.trotelcoin.com/overview/proof-of-collective-intelligence`}
                      target="_blank"
                    >
                      here
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Apprenez-en plus sur comment proposer un cours en cliquant{" "}
                    <Link
                      className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
                      href={`https://docs.trotelcoin.com/overview/proof-of-collective-intelligence`}
                      target="_blank"
                    >
                      ici
                    </Link>
                    .
                  </>
                )}
              </span>

              <div className="flex flex-col mt-8">
                <BasicInformations
                  address={address as Address}
                  lang={lang}
                  title={title as string}
                  setTitle={setTitle}
                  description={description as string}
                  setDescription={setDescription}
                  category={category}
                  setCategory={setCategory}
                  subcategory={subcategory}
                  setSubcategory={setSubcategory}
                  tier={tier}
                  setTier={setTier}
                />
              </div>
            </div>
          </div>
        </Transition>

        <div className="flex justify-between items-center w-full mt-12">
          <button
            disabled={currentPage <= 0}
            onClick={() => handlePrevious()}
            className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold"
          >
            {lang === "en" ? "Previous" : "Précédent"}
          </button>
          <button
            disabled={currentPage >= 3}
            onClick={() => handleNext()}
            className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold"
          >
            {lang === "en" ? "Next" : "Suivant"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmitACourse;
