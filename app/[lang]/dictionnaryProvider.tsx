import React, { createContext, useContext, useEffect, useState } from "react";
import { Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import Loading from "@/app/[lang]/components/loading";

const DictionaryContext = createContext<DictType | null>(null);

export const useDictionary = () => {
  return useContext(DictionaryContext);
};

export const DictionaryProvider = ({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) => {
  const [dict, setDict] = useState<DictType | null>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  if (dict === null) {
    return <Loading />;
  }

  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
};
