import type { LanguageStrings } from "@/types/lang";
import type { Tier } from "@/types/user/premium";

export interface Lesson {
  title: LanguageStrings;
  description: LanguageStrings;
  href: string;
  tier: Tier;
  sponsored: boolean;
  new: boolean;
  quizId: number;
  available: boolean;
}

export interface Lessons {
  category: string;
  courses: Lesson[];
}

export interface Course {
  title: LanguageStrings;
  one: LanguageStrings;
  two: LanguageStrings;
  three: LanguageStrings;
}

export interface Module {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  statusText: string;
  description: string;
  environment: "Not started" | "Finished" | "Ongoing";
  submodules: Submodule[];
}

export interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  environment: "Not started" | "Finished" | "Ongoing";
  description: string;
}

export type Courses = {
  quiz_id: any;
  answered: any;
}[];
