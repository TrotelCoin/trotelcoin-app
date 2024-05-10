import type { Lessons, Lesson } from "@/types/courses/lessons";

export const getTierByQuizId = (
  quizIdParam: number,
  lessons: Lessons[]
): string => {
  let foundTier = "";
  lessons.forEach((lesson: { courses: Lesson[] }) => {
    lesson.courses.forEach((course) => {
      if (course.quizId.toString() === quizIdParam.toString()) {
        foundTier = course.tier.en;
      }
    });
  });
  return foundTier;
};
