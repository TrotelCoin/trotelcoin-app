import { fetchCoursesLikedByUser } from "@/utils/courses/fetchCoursesLikedByUser";
import { fetchCoursesFinishedByUser } from "@/utils/courses/fetchCoursesFinishedByUser";
import { Address } from "viem";
import { lessons } from "@/data/lessons/lessons";
import { CourseRating, CourseFinished } from "@/types/courses/courses";

export async function getCoursesRecommendations(wallet: Address) {
  const coursesLiked = await fetchCoursesLikedByUser(wallet);
  const coursesFinished = await fetchCoursesFinishedByUser(wallet);

  const coursesLikedIds = coursesLiked.map(
    (course: CourseRating) => course.quiz_id
  );

  const coursesFinishedIds = coursesFinished.map(
    (course: CourseFinished) => course.quiz_id
  );

  const likedCategories = lessons
    .flatMap((lesson) =>
      lesson.courses.map((course) => ({ ...course, category: lesson.category }))
    )
    .filter((course) => coursesLikedIds.includes(course.quizId))
    .map((course) => course.category);

  const finishedCategories = lessons
    .flatMap((lesson) =>
      lesson.courses.map((course) => ({ ...course, category: lesson.category }))
    )
    .filter((course) => coursesFinishedIds.includes(course.quizId))
    .map((course) => course.category);

  const uniqueCategories = Array.from(
    new Set([...likedCategories, ...finishedCategories])
  );

  let recommendedLessons = uniqueCategories.flatMap((category) => {
    return lessons
      .filter((lesson) => lesson.category === category)
      .flatMap((lesson) => lesson.courses)
      .filter(
        (course) =>
          !coursesLikedIds.includes(course.quizId) &&
          !coursesFinishedIds.includes(course.quizId)
      );
  });

  recommendedLessons = Array.from(new Set(recommendedLessons));

  return recommendedLessons;
}
