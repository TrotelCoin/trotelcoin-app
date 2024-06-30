export type Cards = {
  en: {
    title: string;
    text: string | JSX.Element;
    video?: boolean;
  }[];
  fr: {
    title: string;
    text: string | JSX.Element;
    video?: boolean;
  }[];
};
