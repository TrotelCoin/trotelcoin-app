export const getTierByQuizId = (quizIdParam: number, lessons: any): string => {
  let foundTier = "";
  lessons.forEach((lesson: { courses: any[] }) => {
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
  lessons: any
): boolean => {
  let foundAvailability = false;
  lessons.forEach((lesson: { courses: any[] }) => {
    lesson.courses.forEach((course) => {
      if (course.quizId.toString() === quizIdParam.toString()) {
        foundAvailability = course.available;
      }
    });
  });
  return foundAvailability;
};
