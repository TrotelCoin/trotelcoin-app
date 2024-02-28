import { Lessons, Lesson, Lang } from "@/types/types";

export function filterByCategory(lesson: Lessons, searchTerm: string) {
  return lesson.category.toLowerCase().includes(searchTerm);
}

export function filterByTitleOrDescription(
  course: Lesson,
  searchTerm: string,
  lang: Lang
) {
  switch (lang) {
    case "en":
      return (
        course.title.en.toLowerCase().includes(searchTerm) ||
        course.description.en.toLowerCase().includes(searchTerm)
      );
    case "fr":
      return (
        course.title.fr.toLowerCase().includes(searchTerm) ||
        course.description.fr.toLowerCase().includes(searchTerm)
      );
    default:
      return (
        course.title.en.toLowerCase().includes(searchTerm) ||
        course.description.en.toLowerCase().includes(searchTerm)
      );
  }
}

export function lessonsLength(lessons: Lessons[]) {
  return lessons.flatMap((lesson) => lesson.courses).length;
}
