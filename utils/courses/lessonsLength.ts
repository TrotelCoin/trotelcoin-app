import type { Lessons } from "@/types/courses/lessons";

export function lessonsLength(lessons: Lessons[]) {
  return lessons.flatMap((lesson) => lesson.courses).length;
}
