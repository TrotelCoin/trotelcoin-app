import type { LanguageStrings } from "@/types/language/lang";
import type { Category, Subcategory } from "@/types/courses/categories";
import type { Tiers } from "@/types/premium/premium";
import { SubmitQuizData } from "@/types/courses/quiz";
import { Address } from "viem";

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
  creator: Address;
  title: string;
  description: string;
  category: Category;
  subcategory: Subcategory;
  tier: Tiers;
  course: SubmitCourseData[];
  quiz: SubmitQuizData;
};

export type CourseRating = {
  quiz_id: number;
  rating: number;
};

export type CourseFinished = {
  quiz_id: number;
  answered: boolean;
};
