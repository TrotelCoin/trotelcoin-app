import { Lessons } from "@/types/courses/lessons";

export function filterByCategory(lesson: Lessons, searchTerm: string) {
  return lesson.category.toLowerCase().includes(searchTerm);
}
