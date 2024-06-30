import { Lesson } from "@/types/courses/lessons";
import { Lang } from "@/types/language/lang";

export function filterByTitleOrDescription(
  course: Lesson,
  searchTerm: string,
  lang: Lang
) {
  switch (lang) {
    case "en":
      return course.title.en.toLowerCase().includes(searchTerm);
    case "fr":
      return course.title.fr.toLowerCase().includes(searchTerm);
    default:
      return course.title.en.toLowerCase().includes(searchTerm);
  }
}
