import type { Lesson, Lessons } from "@/types/courses/lessons";
import { filterByCategory } from "@/utils/courses/filterByCategory";
import { filterByTitleOrDescription } from "@/utils/courses/filterByTitleOrDescription";
import type { Lang } from "@/types/language/lang";

export const hasMatchingQuizId = (lesson: Lesson) => (course: Lesson) =>
  course.quizId === lesson.quizId;

export const findLessonCategory = (lesson: Lesson) => (l: Lessons) =>
  l.courses.some(hasMatchingQuizId(lesson));

export const filterLessons = (
  lesson: Lessons,
  searchTerm: string,
  lang: Lang
) => {
  const categoryMatch = filterByCategory(lesson, searchTerm);
  const titleOrDescMatch = lesson.courses.some((course) =>
    filterByTitleOrDescription(course, searchTerm, lang)
  );
  return categoryMatch || titleOrDescMatch;
};
