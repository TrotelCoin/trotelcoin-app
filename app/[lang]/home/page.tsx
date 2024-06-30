"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import lessons from "@/data/lessons/lessons";
import type { Lang } from "@/types/language/lang";
import type { Lesson, Lessons } from "@/types/courses/lessons";
import { useAccount } from "wagmi";
import { lessonsLength } from "@/utils/courses/lessonsLength";
import PremiumContext from "@/contexts/premium";
import { fetcher, refreshIntervalTime } from "@/utils/axios/fetcher";
import useSWR from "swr";
import { getCoursesRecommendations } from "@/utils/user/getCoursesRecommendations";
import {
  findLessonCategory,
  filterLessons
} from "@/utils/lessons/getInformationsFromLesson";
import CourseSection from "@/app/[lang]/home/components/courseSection";
import { Address } from "viem";

export default function Home({ params: { lang } }: { params: { lang: Lang } }) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [status, setStatus] = useState<string[]>(
    new Array(lessonsLength(lessons)).fill("Not started")
  );
  const [forYouCourses, setForYouCourses] = useState<Lesson[] | null>(null);
  const [mount, setMount] = useState<boolean>(false);
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [statusMounted, setStatusMounted] = useState<boolean>(false);

  const { address } = useAccount();

  const { isIntermediate, isExpert } = useContext(PremiumContext);

  const { data: lessonsCompleted } = useSWR(
    address ? `/api/user/courses/courses-completed?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  const { data: lessonsLiked } = useSWR(
    address ? `/api/user/courses/satisfaction?wallet=${address}` : null,
    fetcher,
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnReconnect: true,
      refreshInterval: refreshIntervalTime
    }
  );

  const allCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.available)
      .map((course) => {
        return { ...course, category: lesson.category };
      })
  );

  const randomLessons = allCourses.sort(() => 0.5 - Math.random());

  useEffect(() => {
    const handleStatus = () => {
      const newStatus = [...status];
      lessonsCompleted.forEach(
        (course: { quiz_id: number; answered: boolean }) => {
          newStatus[course.quiz_id - 1] = course.answered
            ? "Finished"
            : "Not started";
        }
      );
      setStatus(newStatus);
    };

    if (lessonsCompleted && !statusMounted) {
      handleStatus();
      setStatusMounted(true);
    }
  }, [lessonsCompleted, statusMounted, status]);

  useEffect(() => {
    const getRecommendations = async () => {
      const recommendedLessons = await getCoursesRecommendations(
        address as Address,
        lessonsLiked,
        lessonsCompleted
      );

      const forYouCourses = recommendedLessons.map((lesson: Lesson) => {
        const category = lessons.find(findLessonCategory(lesson))?.category;
        return { ...lesson, category };
      });

      if (forYouCourses.length > 0) {
        setForYouCourses(forYouCourses);
      } else {
        setForYouCourses(randomLessons);
      }

      setMount(true);
    };

    if (address && lessonsCompleted && lessonsLiked && !mount) {
      getRecommendations();
    }
  }, [address, lessonsCompleted, lessonsLiked, randomLessons, mount]);

  useEffect(() => {
    const handleLoadingCourses = () => {
      if (lessonsCompleted && lessonsLiked && mount) {
        setIsLoadingCourses(false);
      }
    };

    handleLoadingCourses();
  }, [lessonsCompleted, lessonsLiked, mount]);

  const scrollRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
    new Array(lessons.length).fill(null).map(() => React.createRef())
  );
  const scrollRefForYouCourses = useRef<HTMLDivElement>(null);
  const scrollRefNewCourses = useRef<HTMLDivElement>(null);
  const scrollRefSponsoredCourses = useRef<HTMLDivElement>(null);

  const filteredLessons = lessons
    .filter((lesson) => filterLessons(lesson, searchTerm, lang))
    .map((lesson) => {
      return {
        ...lesson,
        courses: lesson.courses.map((course) => {
          return { ...course, category: lesson.category };
        })
      };
    });

  const scroll = (
    ref: React.RefObject<HTMLDivElement> | null | HTMLDivElement,
    direction: "left" | "right"
  ) => {
    let element;

    if (ref instanceof HTMLDivElement) {
      element = ref;
    } else if (ref && "current" in ref) {
      element = ref.current;
    }

    if (element) {
      const scrollAmount =
        direction === "left" ? -element.clientWidth : element.clientWidth;
      element.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const newCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.new)
      .map((course) => ({ ...course, category: lesson.category }))
  );

  const sponsoredCourses = lessons.flatMap((lesson) =>
    lesson.courses
      .filter((course) => course.sponsored)
      .map((course) => ({ ...course, category: lesson.category }))
  );

  return (
    <>
      <>
        <CourseSection
          title={lang === "en" ? "For You" : "Pour Vous"}
          courses={forYouCourses}
          lang={lang}
          isIntermediate={isIntermediate}
          isExpert={isExpert}
          status={status}
          searchTerm={searchTerm}
          scrollRef={scrollRefForYouCourses}
          scroll={scroll}
          isLoading={isLoadingCourses}
        />

        <CourseSection
          title={lang === "en" ? "New Courses" : "Nouveaux Cours"}
          courses={newCourses.sort((a: Lesson, b: Lesson) => {
            return b.date.getTime() - a.date.getTime();
          })}
          lang={lang}
          isIntermediate={isIntermediate}
          isExpert={isExpert}
          status={status}
          searchTerm={searchTerm}
          scrollRef={scrollRefNewCourses}
          scroll={scroll}
          isLoading={isLoadingCourses}
        />

        <CourseSection
          title={lang === "en" ? "Sponsored" : "Sponsorisés"}
          courses={sponsoredCourses
            .sort((a: Lesson, b: Lesson) => {
              return b.date.getTime() - a.date.getTime();
            })
            .sort(() => 0.5 - Math.random())}
          lang={lang}
          isIntermediate={isIntermediate}
          isExpert={isExpert}
          status={status}
          searchTerm={searchTerm}
          scrollRef={scrollRefSponsoredCourses}
          scroll={scroll}
          isLoading={isLoadingCourses}
        />

        <div className="flex flex-col">
          {filteredLessons
            .filter((lesson) =>
              lesson.courses.some(
                (course: { available: boolean }) => course.available
              )
            )
            .map((lesson: Lessons, index: number) => (
              <CourseSection
                key={index}
                title={lesson.category}
                courses={lesson.courses.sort((a: Lesson, b: Lesson) => {
                  const tierOrder = {
                    Beginner: 2,
                    Intermediate: 1,
                    Expert: 0
                  };
                  return tierOrder[a.tier.en] - tierOrder[b.tier.en];
                })}
                lang={lang}
                isIntermediate={isIntermediate}
                isExpert={isExpert}
                status={status}
                searchTerm={searchTerm}
                scrollRef={scrollRefs.current[index]}
                scroll={scroll}
                isLoading={isLoadingCourses}
                viewAll={true}
                categoryUrl={lesson.categoryUrl}
              />
            ))}
        </div>
      </>
    </>
  );
}
