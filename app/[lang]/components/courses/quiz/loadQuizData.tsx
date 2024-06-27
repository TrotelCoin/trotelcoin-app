import type { Lang } from "@/types/language/lang";
import axios from "axios";

export const loadQuizData = async (quizId: number, lang: Lang) => {
  try {
    const quizData = await axios
      .get(`/api/quizzes/questions?lang=${lang}&quizId=${quizId}`)
      .then((response) => {
        return response.data;
      });

    const answersData = await axios
      .get(`/api/answers`, {
        body: JSON.stringify({ quizId, lang })
      })
      .then((response) => {
        return response.data;
      });

    return JSON.stringify({ quiz: quizData, answers: answersData });
  } catch (error) {
    console.error(error);
  }
};
