import { Lang } from "@/types/types";

export const loadQuizData = async (
  quizId: number,
  setQuestions: Function,
  setCorrectAnswers: Function,
  lang: Lang
) => {
  try {
    const quizResponse = await fetch(
      `/api/quizzes?lang=${lang}&quizId=${quizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store
        },
        cache: "no-store",
      }
    );
    const answersResponse = await fetch(
      `/api/answers?lang=${lang}&quizId=${quizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        cache: "no-store",
      }
    );

    if (quizResponse.ok && answersResponse.ok) {
      const quizData = await quizResponse.json();
      const answersData = await answersResponse.json();

      setQuestions(quizData);
      setCorrectAnswers(answersData);
    } else {
      console.error("Failed to fetch quiz data or answers data");
    }
  } catch (error) {
    console.error("An error occurred while fetching data:", error);
  }
};
