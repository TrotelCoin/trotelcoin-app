import { LanguageStrings } from "@/types/language/lang";

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
