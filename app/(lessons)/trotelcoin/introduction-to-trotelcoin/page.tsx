"use client";

import "animate.css";
import { Course } from "@/types/types";
import React from "react";
import lessons from "@/data/lessonsData";
import Link from "next/link";
import Quiz from "@/app/components/quiz";
import { useAccount, useContractRead } from "wagmi";
import GoHomeButton from "@/app/components/goHomeButton";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/addresses";
import { polygon } from "viem/chains";

const getTierByQuizId = (quizId: number): string => {
  let foundTier = "";
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId === quizId) {
        foundTier = course.tier;
      }
    });
  });
  return foundTier;
};

const getAvailabilityByQuizId = (quizId: number): boolean => {
  let foundAvailability = false;
  lessons.forEach((lesson) => {
    lesson.courses.forEach((course) => {
      if (course.quizId === quizId) {
        foundAvailability = course.available;
      }
    });
  });
  return foundAvailability;
};

const quizId = 1;
const tier = getTierByQuizId(quizId);
const available = getAvailabilityByQuizId(quizId);

const currentCourse: Course = lessons
  .flatMap((lesson) => lesson.courses)
  .find((course) => course.quizId === quizId) as Course;

const CoursePage = () => {
  const { address, isDisconnected } = useAccount();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address,
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  const renderUnauthorizedContent = () => {
    return (
      <>
        <main className="grid min-h-full place-items-center bg-white dark:bg-black px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
              Not available
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-700 dark:text-gray-300">
              Either connect your wallet or become a premium user to access this
              course.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/home"
                className="rounded-md bg-blue-600 dark:bg-blue-200 px-3.5 py-2.5 text-sm font-semibold text-gray-100 dark:text-gray-900 shadow-sm hover:bg-blue-800 dark:hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  };

  const renderCourseContent = () => {
    return (
      <>
        <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-200">
          Course
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {currentCourse.title}
        </h1>
        <p className="mt-2 text-gray-900 dark:text-gray-100">
          What are you going to learn?
        </p>
        <div className="bg-gray-50 my-10 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-lg px-10 py-2 dark:bg-gray-900">
          <ul
            role="list"
            className="max-w-xl space-y-8 text-gray-700 dark:text-gray-300"
          >
            <div className="grid grid-cols-1 divide-y divide-gray-900/10 dark:divide-gray-100/10">
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Choose a crypto wallet that suits your needs.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Understand that crypto wallets serve specific purposes.
                  </span>
                </li>
              </div>
              <div className="py-4">
                <li className="flex gap-x-3">
                  <span className="text-gray-900 dark:text-gray-100">
                    Know good practices to navigate on the web3.
                  </span>
                </li>
              </div>
            </div>
          </ul>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Install your first wallet
        </h2>
        <p className="mt-6">
          Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat
          in. Convallis arcu ipsum urna nibh. Pharetra, euismod vitae interdum
          mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed
          tellus mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi.
          Pellentesque nam sed nullam sed diam turpis ipsum eu a sed convallis
          diam.
        </p>
        <figure className="mt-10 border-l border-blue-600 dark:border-blue-200 pl-9">
          <blockquote className="font-semibold text-gray-900 dark:text-gray-100">
            <p>
              “Vel ultricies morbi odio facilisi ultrices accumsan donec lacus
              purus. Lectus nibh ullamcorper ac dictum justo in euismod. Risus
              aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
              tristique.”
            </p>
          </blockquote>
          <figcaption className="mt-6 flex gap-x-4">
            <div className="text-sm leading-6">
              <strong className="font-semibold text-gray-900 dark:text-gray-100">
                Alexandre Trotel
              </strong>{" "}
              – CEO & Founder
            </div>
          </figcaption>
        </figure>
        <p className="mt-10">
          Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
          enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
          praesent donec est. Odio penatibus risus viverra tellus varius sit
          neque erat velit.
        </p>

        <div className="mt-16 mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Configure your wallet
          </h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam
            varius orci dapibus volutpat cras. In amet eu ridiculus leo sodales
            cursus tristique. Tincidunt sed tempus ut viverra ridiculus non
            molestie. Gravida quis fringilla amet eget dui tempor dignissim.
            Facilisis auctor venenatis varius nunc, congue erat ac. Cras
            fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
            enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
            praesent donec est. Odio penatibus risus viverra tellus varius sit
            neque erat velit.
          </p>
        </div>

        {/* Quizz */}
        <Quiz quizId={quizId} />
        <GoHomeButton />
      </>
    );
  };

  return (
    <>
      {isDisconnected && tier !== "Beginner"
        ? renderUnauthorizedContent()
        : !available ||
          (tier !== "Beginner" &&
            ((tier === "Intermediate" && intermediateBalance < 1) ||
              (tier === "Expert" && expertBalance < 1)))
        ? renderUnauthorizedContent()
        : renderCourseContent()}
    </>
  );
};

export default CoursePage;
