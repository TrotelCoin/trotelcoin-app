import quizzes from "@/data/quizzes/quizData";

const answers = quizzes.map(quiz => {
  const correctAnswers = {
    en: quiz.questions.map(question => question.options.en[0]),
    fr: quiz.questions.map(question => question.options.fr[0]),
  };

  return { quizId: quiz.quizId, correctAnswers };
});

export default answers;
