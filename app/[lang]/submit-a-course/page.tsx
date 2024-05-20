"use client";

import { Lang } from "@/types/language/lang";
import Link from "next/link";
import React, { useState } from "react";
import BasicInformations from "./components/basicInformations";
import type { Category, Subcategory } from "@/types/courses/categories";
import type { Tiers } from "@/types/premium/premium";
import { useAccount } from "wagmi";
import { Address } from "viem";
import type { SubmitQuizData } from "@/types/courses/quiz";
import CourseData from "@/app/[lang]/submit-a-course/components/courseData";
import QuizData from "@/app/[lang]/submit-a-course/components/quizData";
import type { CourseJSON, SubmitCourseData } from "@/types/courses/courses";
import PreviewCourseData from "@/app/[lang]/submit-a-course/components/preview";
import { loadingFlashClass } from "@/style/loading";
import Fail from "@/app/[lang]/components/modals/fail";

const SubmitACourse = ({ params: { lang } }: { params: { lang: Lang } }) => {
  const storedTitle: string = localStorage.getItem(
    "submit_course_title"
  ) as string;
  const storedDescription: string = localStorage.getItem(
    "submit_course_description"
  ) as string;
  const storedCategory: Category = localStorage.getItem(
    "submit_course_category"
  ) as Category;
  const storedSubcategory: Subcategory = localStorage.getItem(
    "submit_course_subcategory"
  ) as Subcategory;
  const storedTier: Tiers = localStorage.getItem("submit_course_tier") as Tiers;
  const storedCourse: SubmitCourseData[] = JSON.parse(
    localStorage.getItem("submit_course_course") as string
  ) as SubmitCourseData[];
  const storedQuiz: SubmitQuizData = JSON.parse(
    localStorage.getItem("submit_course_quiz") as string
  ) as SubmitQuizData;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [title, setTitle] = useState<string | undefined>(storedTitle);
  const [description, setDescription] = useState<string | undefined>(
    storedDescription
  );
  const [category, setCategory] = useState<Category>(storedCategory ?? "Web3");
  const [subcategory, setSubcategory] = useState<Subcategory>(
    storedSubcategory ?? "Cryptocurrencies"
  );
  const [tier, setTier] = useState<Tiers>(storedTier ?? "Beginner");
  const [course, setCourse] = useState<SubmitCourseData[] | null>(
    storedCourse ?? Array(4).fill(null)
  ); // only support text for now
  const [quiz, setQuiz] = useState<SubmitQuizData>(
    storedQuiz ?? {
      title: "",
      questions: Array(4).fill({
        question: null,
        options: Array(4).fill(null),
        correctAnswer: 0,
      }),
    }
  );
  const [error, setError] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [json, setJson] = useState<CourseJSON | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cid, setCid] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [tx, setTx] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);

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

    if (error) {
      setShowError(true);
      return;
    }

    setCurrentPage((prev) => prev + 1);

    if (currentPage === 2 || currentPage === 3) {
      createCourseJson();
    }
  };

  const createCourseJson = () => {
    const courseJson: CourseJSON = {
      creator: address as Address,
      title: title as string,
      description: description as string,
      category: category,
      subcategory: subcategory,
      tier: tier,
      course: course as SubmitCourseData[],
      quiz: quiz,
    };

    setJson(courseJson);
  };

  const uploadFile = async (file: File) => {
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch(`/api/files?title=${title}`, {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      setCid(resData.IpfsHash);

      return resData.IpfsHash;
    } catch (error) {
      console.error(error);
      setUploadError(true);
    }
  };

  const submit = async () => {
    setIsLoading(true);

    // check if json is available

    if (!address) {
      setAddressError(true);
      setIsLoading(false);
      return;
    }

    if (!json) {
      setJsonError(true);
      setIsLoading(false);
      return;
    }

    // pay the fee

    // upload to ipfs and get the cid

    const file = new File([JSON.stringify(json)], "course.json", {
      type: "application/json",
    });

    const cid = await uploadFile(file);

    // submit to the blockchain (json and cid)

    // show success message

    // remove local storage
    localStorage.removeItem("submit_course_title");
    localStorage.removeItem("submit_course_description");
    localStorage.removeItem("submit_course_category");
    localStorage.removeItem("submit_course_subcategory");
    localStorage.removeItem("submit_course_tier");
    localStorage.removeItem("submit_course_course");
    localStorage.removeItem("submit_course_quiz");

    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <div className="mx-auto flex flex-col justify-center max-w-xl w-full items-center text-gray-900 dark:text-gray-100">
        {submitted ? (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-4xl font-semibold">
                {lang === "en" ? "Course submitted!" : "Cours soumis!"}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en"
                  ? "Your course has been successfully submitted to the blockchain."
                  : "Votre cours a été soumis avec succès à la blockchain."}
              </span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {lang === "en"
                  ? "You can view the course on IPFS by clicking"
                  : "Vous pouvez voir le cours sur IPFS en cliquant"}
                <Link
                  className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
                  href={`https://ipfs.io/ipfs/${cid}`}
                  target="_blank"
                >
                  {lang === "en" ? " here." : " ici."}{" "}
                </Link>
                {lang === "en"
                  ? "You can also see the blockchain transaction by clicking"
                  : "Vous pouvez également voir la transaction sur la blockchain en cliquant"}{" "}
                <Link
                  className="text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-400"
                  href={`https://polygonscan.com/tx/${tx}`}
                  target="_blank"
                >
                  {lang === "en" ? " here." : " ici."}
                </Link>
              </span>
            </div>
          </>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full"
            >
              {currentPage === 0 && (
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
                          Apprenez-en plus sur comment proposer un cours en
                          cliquant{" "}
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
                        setError={setError}
                        showError={showError}
                        setShowError={setShowError}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 1 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl font-semibold">
                      {lang === "en"
                        ? "It is now time to build the course."
                        : "Il est désormais temps de construire le cours."}
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
                          Apprenez-en plus sur comment proposer un cours en
                          cliquant{" "}
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
                      <CourseData
                        lang={lang}
                        course={course as SubmitCourseData[]}
                        setCourse={setCourse}
                        setError={setError}
                        showError={showError}
                        setShowError={setShowError}
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 2 && (
                <div className="flex flex-col w-full">
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl font-semibold">
                      {lang === "en"
                        ? "Finally, let's build the quiz."
                        : "Finalement, construisons le quiz."}
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
                          Apprenez-en plus sur comment proposer un cours en
                          cliquant{" "}
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
                      <QuizData
                        lang={lang}
                        quiz={quiz}
                        setQuiz={setQuiz}
                        setError={setError}
                        showError={showError}
                        setShowError={setShowError}
                      />
                    </div>
                  </div>
                </div>
              )}
            </form>

            {currentPage === 3 && (
              <div className="flex flex-col w-full">
                <div className="flex flex-col gap-2">
                  <span className="text-4xl font-semibold">
                    {lang === "en"
                      ? "Verify that everything is right on track and educate others."
                      : "Vérifiez que tout est en ordre et éduquez les autres."}
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
                        Apprenez-en plus sur comment proposer un cours en
                        cliquant{" "}
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
                    {isLoading ? (
                      <>
                        <div className="flex flex-col gap-2 text-center">
                          <span
                            className={`font-semibold text-gray-900 dark:text-gray-100 ${loadingFlashClass}`}
                          >
                            {lang === "en"
                              ? "Submitting the course to the blockchain."
                              : "Soumission du cours à la blockchain."}
                          </span>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {lang === "en"
                              ? "This process may take a few seconds."
                              : "Ce processus peut prendre quelques secondes."}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <PreviewCourseData
                          lang={lang}
                          json={json as CourseJSON}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center w-full mt-12">
              <button
                disabled={currentPage <= 0}
                onClick={() => handlePrevious()}
                value={lang === "en" ? "Previous" : "Précédent"}
                className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold"
              >
                {lang === "en" ? "Previous" : "Précédent"}
              </button>
              {currentPage >= 3 ? (
                <>
                  <button
                    type="submit"
                    value={lang === "en" ? "Submit" : "Soumettre"}
                    disabled={currentPage < 3 || isLoading}
                    onClick={() => submit()}
                    className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold"
                  >
                    {lang === "en" ? "Submit" : "Soumettre"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    disabled={currentPage >= 3}
                    onClick={() => handleNext()}
                    value={lang === "en" ? "Next" : "Suivant"}
                    className="flex border border-gray-900/10 dark:border-gray-100/10 bg-gray-50 dark:bg-gray-800 hover:shadow hover:border-gray-900/50 dark:hover:border-gray-100/50 focus:shadow-none focus:border-blue-500 dark:focus:border-blue-300 text-sm px-6 py-2 text-gray-900 dark:text-gray-100 rounded-xl font-semibold"
                  >
                    {lang === "en" ? "Next" : "Suivant"}
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <Fail
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "An error occured with the JSON file. Check that you filled every field correctly."
            : "Une erreur est survenue avec le fichier JSON. Vérifiez que vous avez bien rempli chaque champ."
        }
        onClose={() => setJsonError(false)}
        show={jsonError}
      />
      <Fail
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "An error occured while uploading the file. Please try again."
            : "Une erreur est survenue lors de l'envoi du fichier. Veuillez réessayer."
        }
        onClose={() => setUploadError(false)}
        show={uploadError}
      />
      <Fail
        lang={lang}
        title={lang === "en" ? "Error" : "Erreur"}
        message={
          lang === "en"
            ? "Your wallet seems to be disconnected."
            : "Votre portefeuille semble être déconnecté."
        }
        onClose={() => setAddressError(false)}
        show={addressError}
      />
    </>
  );
};

export default SubmitACourse;
