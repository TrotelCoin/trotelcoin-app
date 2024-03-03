import { DictType } from "@/types/types";
import React from "react";

const Form = ({
  dict,
  setSearchTerm,
}: {
  dict: DictType;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <form className="mb-10">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          {typeof dict?.home !== "string" && <>{dict?.home.search}</>}
        </label>
        <div className="relative mx-auto w-full">
          <div className="absolute inset-y-0 left-0 flex items-center px-5 pointer-events-none">
            <>🔍</>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-14 focus:shadow focus:border-gray-900/50 dark:focus:border-gray-100/50 text-sm text-gray-900 border border-gray-900/10 rounded-full bg-gray-100 dark:bg-gray-800 dark:border-gray-100/10 dark:placeholder-gray-400 dark:text-white focus:outline-none"
            placeholder={
              typeof dict?.home !== "string" &&
              typeof dict?.home.search === "string"
                ? dict?.home.search
                : "What do you want to learn?"
            }
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ appearance: "none" }}
          />
        </div>
      </form>
    </>
  );
};

export default Form;
