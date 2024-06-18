import { Lang } from "@/types/language/lang";
import React, { useEffect } from "react";
import Required from "@/app/[lang]/submit-a-course/components/required";
import { SubmitCourseData } from "@/types/courses/courses";
import BlueButton from "@/app/[lang]/components/buttons/blue";
import { XMarkIcon } from "@heroicons/react/24/solid";

const CourseData = ({
  lang,
  course,
  setCourse,
  setError,
  showError,
  setShowError
}: {
  lang: Lang;
  course: SubmitCourseData[];
  setCourse: React.Dispatch<React.SetStateAction<SubmitCourseData[] | null>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  showError: boolean;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleTitleChange = (index: number, value: string) => {
    setCourse((prev) => {
      if (prev !== null) {
        return prev.map((item, i) =>
          i === index ? { ...item, title: value } : item
        );
      }
      return prev;
    });
  };

  const handleContentChange = (index: number, value: string) => {
    setCourse((prev) => {
      if (prev !== null) {
        return prev.map((item, i) =>
          i === index ? { ...item, slide: value } : item
        );
      }
      return prev;
    });
  };

  const addSlide = () => {
    if (course.length < 12) {
      setCourse((prev) => {
        if (prev !== null) {
          return [...prev, { title: "", slide: "" }];
        }
        return prev;
      });
    }
  };

  const removeSlide = (index: number) => {
    setCourse((prev) => {
      if (prev !== null) {
        return prev.filter((_, i) => i !== index);
      }
      return prev;
    });
  };

  const isCourseError = (slide: SubmitCourseData) => {
    const isCourseError =
      slide === null ||
      slide.title === null ||
      slide.slide === null ||
      slide.title === undefined ||
      slide.slide === undefined ||
      slide.title?.length === 0 ||
      slide.slide?.length === 0 ||
      slide.title === "" ||
      slide.slide === "";

    return isCourseError;
  };

  useEffect(() => {
    if (course.some((slide) => isCourseError(slide))) {
      setError(true);
    } else {
      setError(false);
      setShowError(false);
    }
  }, [course, setError, setShowError]);

  useEffect(() => {
    if (course && course.length > 0) {
      localStorage.setItem("submit_course_course", JSON.stringify(course));
    }
  }, [course]);

  return (
    <>
      <div className="flex flex-col gap-8">
        {course.map((slide, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {lang === "en" ? `Slide ${index + 1}` : `Diapo ${index + 1}`}
                </span>
                {index < 4 && <Required />}
              </div>
              {index > 3 && (
                <button
                  type="button"
                  onClick={() => removeSlide(index)}
                  disabled={course.length <= 4}
                  className="inline-flex rounded-full p-2 text-gray-700 hover:bg-gray-100 focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === "en" ? "Title" : "Titre"}
                </span>
              </div>
              <input
                type="text"
                placeholder={
                  lang === "en"
                    ? "The title of the slide"
                    : "Le titre de la diapo"
                }
                onChange={(e) => handleTitleChange(index, e.target.value)}
                value={slide?.title ?? ""}
                maxLength={80}
                className="rounded-xl border border-gray-900/10 bg-white ring-0 focus:outline-none active:border-blue-500 dark:border-gray-100/10 dark:bg-gray-800 dark:focus:outline-none dark:active:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300">
                  {lang === "en" ? "Content" : "Contenu"}
                </span>
              </div>
              <textarea
                placeholder={
                  lang === "en"
                    ? "Write everything that you find interesting here."
                    : "Écrivez tout ce que vous trouvez intéressant ici."
                }
                onChange={(e) => handleContentChange(index, e.target.value)}
                value={slide?.slide}
                maxLength={500}
                className="h-24 rounded-xl border border-gray-900/10 bg-white ring-0 focus:outline-none active:border-blue-500 dark:border-gray-100/10 dark:bg-gray-800 dark:focus:outline-none dark:active:border-blue-500"
              />
            </div>

            {showError && isCourseError(slide) && (
              <p className="text-red-500 dark:text-red-300">
                {lang === "en"
                  ? "Both title and content are required."
                  : "Le titre et le contenu sont requis."}
              </p>
            )}
          </div>
        ))}

        <BlueButton
          lang={lang}
          onClick={addSlide}
          text={lang === "en" ? "Add a slide" : "Ajouter une diapo"}
          disabled={course.length >= 12}
        />
      </div>
    </>
  );
};

export default CourseData;
