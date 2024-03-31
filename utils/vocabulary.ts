import type { Vocabulary } from "@/types/components/cards";

const getRandomVocabulary = (vocabulary: Vocabulary) => {
  return vocabulary.sort(() => Math.random() - 0.5).slice(0, 10);
};

export default getRandomVocabulary;
