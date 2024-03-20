export type Cards = {
  en: {
    title: string;
    text: string | JSX.Element;
  }[];
  fr: {
    title: string;
    text: string | JSX.Element;
  }[];
};

export type Vocabulary = {
  en: {
    word: string;
    definition: string;
  };
  fr: {
    word: string;
    definition: string;
  };
}[];

export type VocabularyItem = {
  en: {
    word: string;
    definition: string;
  };
  fr: {
    word: string;
    definition: string;
  };
};
