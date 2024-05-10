import lessons from "@/data/lessons/lessons";

export const checkIfCourseIsAvailable = (quizId: number): boolean => {
  const isCourseAvailable = lessons.some((category) => {
    category.courses.some((lesson) => {
      return lesson.quizId && lesson.available;
    });
  });

  return isCourseAvailable;
};
