import { SubmitQuestionData, SubmitQuizData } from "@/types/courses/quiz";
import { Lang } from "@/types/language/lang";
import React, { SetStateAction, useEffect } from "react";
import Required from "@/app/[lang]/submit-a-course/components/required";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import BlueButton from "@/app/[lang]/components/buttons/blue";

const QuizData = ({
  lang,
  quiz,
  setQuiz,
  setError,
  showError,
  setShowError,
}: {
  lang: Lang;
  quiz: SubmitQuizData;
  setQuiz: React.Dispatch<SetStateAction<SubmitQuizData>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleQuestionChange = (index: number, value: string) => {
    setQuiz((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          questions: prev.questions.map((question, i) =>
            i === index ? { ...question, question: value } : question
          ),
        };
      }
      return prev;
    });
  };

  const updateOptions = (
    question: { question: string; options: string[]; correctAnswer: number },
    i: number,
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    if (i !== questionIndex) return question;

    return {
      ...question,
      options: question.options.map((option: any, index: number) =>
        index === optionIndex ? value : option
      ),
      correctAnswer: question.correctAnswer || 0,
    };
  };

  const handleOptionsChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setQuiz((prev) => {
      if (prev === null) return prev;

      return {
        ...prev,
        questions: prev.questions.map((question, i) =>
          updateOptions(question, i, questionIndex, optionIndex, value)
        ),
      };
    });
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setQuiz((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          questions: prev.questions.map((question, i) =>
            i === questionIndex
              ? { ...question, correctAnswer: answerIndex }
              : question
          ),
        };
      }
      return prev;
    });
  };

  const addQuestion = () => {
    if (quiz.questions.length < 8) {
      setQuiz((prev) => {
        if (prev !== null) {
          return {
            ...prev,
            questions: [
              ...prev.questions,
              {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: 0,
              },
            ],
          };
        }
        return prev;
      });
    }
  };

  const removeSlide = (index: number) => {
    setQuiz((prev) => {
      if (prev !== null) {
        return {
          ...prev,
          questions: prev.questions.filter((_, i) => i !== index),
        };
      }
      return prev;
    });
  };

  const isQuizError = (question: SubmitQuestionData) => {
    const isQuestionError =
      !question.question ||
      question.question.trim().length === 0 ||
      question.options.some(
        (option) => !option || option.trim().length === 0
      ) ||
      question.correctAnswer < 0 ||
      question.correctAnswer >= question.options.length;

    return isQuestionError;
  };

  useEffect(() => {
    if (quiz.questions.some((question) => isQuizError(question))) {
      setError(true);
    } else {
      setError(false);
      setShowError(false);
    }
  }, [quiz]);

  useEffect(() => {
    if (quiz && quiz.questions.length > 0) {
      localStorage.setItem("submit_course_quiz", JSON.stringify(quiz));
    }
  }, [quiz]);



  return (
    <>
      <div className="flex flex-col gap-8">
        {quiz.questions.map((question, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {lang === "en"
                    ? `Question ${index + 1}`
                    : `Question ${index + 1}`}
                </span>
                {index < 4 && <Required />}
              </div>
              {index > 3 && (
                <button
                  type="button"
                  onClick={() => removeSlide(index)}
                  disabled={quiz.questions.length <= 4}
                  className="inline-flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === "en" ? "Question" : "Question"}
                </span>
              </div>
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "Write a question on the course"
                    : "Écrivez une question sur le cours"
                }
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                value={question?.question}
                maxLength={100}
                className="rounded-xl bg-white dark:bg-gray-800 focus:outline-none dark:focus:outline-none ring-0 border border-gray-900/10 dark:border-gray-100/10 active:border-blue-500 dark:active:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === "en" ? "Réponses possibles" : "Possible answers"}
                </span>
              </div>
              {question.options.map((option: string, questionIndex: number) => (
                <div key={questionIndex} className="flex items-center gap-2">
                  <button
                    onClick={() => handleAnswerChange(index, questionIndex)}
                    className={`flex items-center gap-2 p-2 rounded-full w-10 h-10 border border-gray-900/10 dark:border-gray-100/10 ${
                      question.correctAnswer === questionIndex
                        ? "bg-blue-500 dark:bg-blue-300"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    {question.correctAnswer === questionIndex && (
                      <>
                        <CheckIcon className="h-5 w-5 text-gray-100" />
                      </>
                    )}
                  </button>
                  <input
                    placeholder={
                      lang === "en"
                        ? "Write the possible answers to the question"
                        : "Écrivez les réponses possibles à la question"
                    }
                    onChange={(e) =>
                      handleOptionsChange(index, questionIndex, e.target.value)
                    }
                    value={option}
                    maxLength={200}
                    className="rounded-xl w-full bg-white dark:bg-gray-800 focus:outline-none dark:focus:outline-none ring-0 border border-gray-900/10 dark:border-gray-100/10 active:border-blue-500 dark:active:border-blue-500"
                  />
                </div>
              ))}
            </div>

            {showError && isQuizError(question) && (
              <p className="text-red-500 dark:text-red-300">
                {lang === "en"
                  ? "Complete the question and all options."
                  : "Complétez la question et toutes les options."}
              </p>
            )}
          </div>
        ))}

        <BlueButton
          lang={lang}
          onClick={addQuestion}
          text={lang === "en" ? "Add a question" : "Ajouter une question"}
          disabled={quiz.questions.length >= 8}
        />
      </div>
    </>
  );
};

export default QuizData;
