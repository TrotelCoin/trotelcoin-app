import { Category, Subcategory } from "@/types/courses/categories";
import { Tiers } from "@/types/premium/premium";
import { Lang } from "@/types/language/lang";
import { RadioGroup } from "@headlessui/react";
import React, { use, useEffect, useState } from "react";
import { categories } from "@/data/courses/categories";
import { Address } from "viem";
import Required from "@/app/[lang]/submit-a-course/components/required";

const BasicInformations = ({
  address,
  lang,
  title,
  setTitle,
  description,
  setDescription,
  category,
  setCategory,
  subcategory,
  setSubcategory,
  tier,
  setTier,
  setError,
  showError,
  setShowError,
}: {
  address: Address;
  lang: Lang;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>;
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  subcategory: Subcategory;
  setSubcategory: React.Dispatch<React.SetStateAction<Subcategory>>;
  tier: Tiers;
  setTier: React.Dispatch<React.SetStateAction<Tiers>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [categoryIndex, setCategoryIndex] = useState<number>(0);

  useEffect(() => {
    const index = categories.findIndex((cat) => cat.category === category);

    console.log("index", index);

    setCategoryIndex(index);
  }, [category]);

  useEffect(() => {
    if (categoryIndex === -1) {
      setCategory(categories[0].category);
    }
  }, [categoryIndex]);

  const isInformationsError = (
    title: string,
    description: string,
    category: Category,
    subcategory: Subcategory,
    tier: Tiers
  ) => {
    const isTitleEmpty = title === "" || title === undefined || title === null;
    const isDescriptionEmpty =
      description === "" || description === undefined || description === null;
    const isCategoryEmpty = category === null || category === undefined;
    const isSubcategoryEmpty =
      subcategory === null || subcategory === undefined;
    const isTierEmpty = tier === null || tier === undefined;

    return (
      isTitleEmpty ||
      isDescriptionEmpty ||
      isCategoryEmpty ||
      isSubcategoryEmpty ||
      isTierEmpty
    );
  };

  useEffect(() => {
    if (!isInformationsError(title, description, category, subcategory, tier)) {
      setError(false);
      setShowError(false);
    } else {
      setError(true);
    }
  }, [title, description, category, subcategory, tier]);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Address */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Your address" : "Votre addresse"}
            </span>
            <Required />
          </div>
          <input
            type="text"
            disabled={true}
            value={address ?? "Not connected"}
            className="rounded-xl text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 focus:outline-none dark:focus:outline-none ring-0 border border-gray-900/10 dark:border-gray-100/10"
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Course title" : "Titre du cours"}
            </span>
            <Required />
          </div>
          <input
            type="text"
            placeholder="Introduction to TrotelCoin"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
            className="rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none dark:focus:outline-none ring-0 border border-gray-900/10 dark:border-gray-100/10 active:border-blue-500 dark:active:border-blue-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Course description" : "Description du cours"}
            </span>
            <Required />
          </div>
          <input
            type="text"
            placeholder={
              lang === "en"
                ? "Learn about TrotelCoin and its use cases."
                : "Apprenez en plus sur TrotelCoin et ses cas d'utilisation."
            }
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            className="rounded-xl bg-gray-50 dark:bg-gray-800 focus:outline-none dark:focus:outline-none ring-0 border border-gray-900/10 dark:border-gray-100/10 active:border-blue-500 dark:active:border-blue-500"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Category" : "Catégorie"}
            </span>
            <Required />
          </div>
          <RadioGroup
            value={category}
            onChange={setCategory}
            className={`flex flex-wrap items-center gap-2`}
          >
            {categories &&
              categories.map((category, index) => (
                <RadioGroup.Option key={index} value={category.category}>
                  {({ checked }) => (
                    <div
                      className={`cursor-pointer text-sm ${
                        checked
                          ? "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-transparent"
                          : "bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-gray-900 dark:text-gray-100"
                      } rounded-xl backdrop-blur-xl py-1 px-2 text-center`}
                    >
                      {category.category}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
          </RadioGroup>
        </div>

        {/* Subcategory */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-gray-700 dark:text-gray-300">
              {lang === "en" ? "Subcategory" : "Sous-catégorie"}
            </span>
            <Required />
          </div>
          <RadioGroup
            value={subcategory}
            onChange={setSubcategory}
            className={`flex flex-wrap items-center gap-2`}
          >
            {categories &&
              categories[categoryIndex].subcategories &&
              categories[categoryIndex].subcategories.map(
                (subcategory: Subcategory, index: number) => (
                  <RadioGroup.Option key={index} value={subcategory}>
                    {({ checked }) => (
                      <div
                        className={`cursor-pointer text-sm ${
                          checked
                            ? "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-transparent"
                            : "bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-gray-900 dark:text-gray-100"
                        } rounded-xl backdrop-blur-xl py-1 px-2 text-center`}
                      >
                        {subcategory}
                      </div>
                    )}
                  </RadioGroup.Option>
                )
              )}
          </RadioGroup>
        </div>

        {/* Tier */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-gray-700 dark:text-gray-300">
                {lang === "en" ? "Tier" : "Tier"}
              </span>
              <Required />
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {lang === "en"
                ? "Choosing Beginner makes also the course accessible for Intermediate and Expert by default."
                : "Le fait de choisir Débutant rend aussi le cours accessible par défaut à Intermédiaire et Expert."}
            </span>
          </div>
          <RadioGroup
            value={tier}
            onChange={setTier}
            className="grid grid-cols-2 md:grid-cols-3 gap-2"
          >
            <RadioGroup.Option value="Beginner">
              {({ checked }) => (
                <div
                  className={`cursor-pointer ${
                    checked
                      ? "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-transparent"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-gray-900 dark:text-gray-100"
                  } rounded-xl backdrop-blur-xl py-3 px-1 text-center`}
                >
                  {lang === "en" ? "Beginner 🐣" : "Débutant 🐣"}
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Intermediate">
              {({ checked }) => (
                <div
                  className={`cursor-pointer ${
                    checked
                      ? "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-transparent"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-gray-900 dark:text-gray-100"
                  } rounded-xl backdrop-blur-xl py-3 px-1 text-center`}
                >
                  {lang === "en" ? "Intermediate 🙈" : "Intermédiaire 🙈"}
                </div>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="Expert">
              {({ checked }) => (
                <div
                  className={`cursor-pointer ${
                    checked
                      ? "bg-gray-900 dark:bg-white text-gray-100 dark:text-gray-900 border border-transparent"
                      : "bg-gray-50 dark:bg-gray-800 border border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-gray-900 dark:text-gray-100"
                  } rounded-xl backdrop-blur-xl py-3 px-1 text-center`}
                >
                  {lang === "en" ? "Expert 🦊" : "Expert 🦊"}
                </div>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>

        {showError && (
          <p className="text-red-500 dark:text-red-300">
            {lang === "en"
              ? "Please fill in all the required fields."
              : "Veuillez remplir tous les champs obligatoires."}
          </p>
        )}
      </div>
    </>
  );
};

export default BasicInformations;
