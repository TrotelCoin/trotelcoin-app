import { Lesson, Lessons } from "@/types/courses/lessons";

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
