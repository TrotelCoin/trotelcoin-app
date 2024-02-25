"use client";

import React, { useEffect, useState } from "react";
import lessons from "@/data/lessons/lessonsData";
import { Address, useContractRead } from "wagmi";
import { polygon } from "wagmi/chains";
import trotelCoinIntermediateABI from "@/abi/trotelCoinIntermediate";
import trotelCoinExpertABI from "@/abi/trotelCoinExpert";
import renderCourses from "@/app/[lang]/home/components/renderCourses";
import {
  trotelCoinIntermediateAddress,
  trotelCoinExpertAddress,
} from "@/data/web3/addresses";
import { Lessons, Lang, DictType } from "@/types/types";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { useAddress } from "@thirdweb-dev/react";
import Form from "@/app/[lang]/home/components/form";
import {
  filterByCategory,
  filterByTitleOrDescription,
  lessonsLength,
} from "@/utils/courses";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dict, setDict] = useState<DictType | null>(null);
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );

  useEffect(() => {
    const fetchDictionary = async () => {
      const result = await getDictionary(lang);
      setDict(result);
    };

    fetchDictionary();
  }, [lang]);

  const handleSearch = (e: { target: { value: string } }) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filterLessons = (lesson: Lessons) => {
    const categoryMatch = filterByCategory(lesson, searchTerm);
    const titleOrDescMatch = lesson.courses.some((course) =>
      filterByTitleOrDescription(course, searchTerm, lang)
    );
    return categoryMatch || titleOrDescMatch;
  };

  const filteredLessons = lessons.filter(filterLessons);

  const address = useAddress();

  const { data: intermediate } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinIntermediateAddress,
    abi: trotelCoinIntermediateABI,
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });
  const { data: expert } = useContractRead({
    chainId: polygon.id,
    address: trotelCoinExpertAddress,
    abi: trotelCoinExpertABI,
    args: [address],
    account: address as Address,
    enabled: Boolean(address),
    functionName: "balanceOf",
    watch: true,
  });

  const intermediateBalance = parseFloat(intermediate as string);
  const expertBalance = parseFloat(expert as string);

  // status = status.map((_, index) =>
  //   QuizStatus({ index, address: address as Address })
  //);

  useEffect(() => {
    const fetchCoursesCompleted = async () => {
      const response = await fetch(
        `/api/database/coursesCompleted?wallet=${address}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          cache: "no-store",
        }
      );
      const result = await response.json();

      result?.map((course: { quiz_id: number; answered: boolean }) => {
        if (course.answered) {
          setStatus((prev) => {
            const newState = [...prev];
            newState[course.quiz_id - 1] = "Finished";
            return newState;
          });
        } else {
          setStatus((prev) => {
            const newState = [...prev];
            newState[course.quiz_id - 1] = "Not started";
            return newState;
          });
        }
      });
    };

    if (address) {
      fetchCoursesCompleted();

      const interval = setInterval(fetchCoursesCompleted, 10000);

      return () => clearInterval(interval);
    } else {
      setStatus(new Array(lessonsLength(lessons)).fill("Not started"));
    }
  }, [address]);

  return (
    <>
      <>
        <Form dict={dict as DictType} handleSearch={handleSearch} />
        <div className="flex flex-col">
          {filteredLessons.map((lesson, index) => (
            <div className="my-10" key={index}>
              <h2 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                {lesson.category}
              </h2>
              <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {lesson.courses
                  .slice()
                  .sort((a, b) => {
                    const tierOrder = {
                      Beginner: 0,
                      Intermediate: 1,
                      Expert: 2,
                    };
                    return tierOrder[a.tier.en] - tierOrder[b.tier.en];
                  })
                  .map((course, index) =>
                    renderCourses(
                      course,
                      intermediateBalance,
                      expertBalance,
                      lang,
                      course.quizId,
                      status,
                      address as Address,
                      dict,
                      index
                    )
                  )}
              </div>
            </div>
          ))}
        </div>
      </>
    </>
  );
}
