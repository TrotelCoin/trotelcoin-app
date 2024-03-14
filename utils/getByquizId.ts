import { Lessons, Lesson } from "@/types/types";

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

export const getAvailabilityByQuizId = (
  quizIdParam: number,
  lessons: Lessons[]
): boolean => {
  let foundAvailability = false;
  lessons.forEach((lesson: { courses: Lesson[] }) => {
    lesson.courses.forEach((course) => {
      if (course.quizId.toString() === quizIdParam.toString()) {
        foundAvailability = course.available;
      }
    });
  });
  return foundAvailability;
};
