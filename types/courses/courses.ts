import type { LanguageStrings } from "@/types/language/lang";
import type { Category, Subcategory } from "@/types/courses/categories";
import type { Tiers } from "@/types/premium/premium";
import { SubmitQuizData } from "@/types/courses/quiz";

export interface Course {
  title: LanguageStrings;
  one: LanguageStrings;
  two: LanguageStrings;
  three: LanguageStrings;
}

export type Courses = {
  quiz_id: any;
  answered: any;
}[];

export type SubmitCourseData = {
  title: string;
  slide: string;
};

export type CourseJSON = {
  title: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
  tier: Tiers;
  course: SubmitCourseData[];
  quiz: SubmitQuizData;
};
