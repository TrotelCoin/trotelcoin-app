// Define an interface for an Article object
export interface Article {
  id: number; // Unique identifier for the article
  title: string; // Title of the article
  category: string; // Category or topic of the article
  image: string; // URL of an associated image for the article
  date: string; // Publication date of the article
  author: string; // Name of the author of the article
  body: () => JSX.Element; // Function returning JSX representing the article's content
}

export interface Modals {
  title: string; // Title of the message
  show: boolean; // Indicates whether the dialog should be displayed
  message: string; // The success message to display
  onClose: () => void; // A function to handle the dialog close action
}

export interface Token {
  symbol: string; // Token symbol (e.g., "TROTEL")
  address: `0x${string}`; // Token address (e.g., "0xf04ab1a43cba1474160b7b8409387853d7be02d5")
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

// Define the Submodule interface
export interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "Not started" | "Finished" | "Ongoing";
  environment: "Not started" | "Finished" | "Ongoing";
  description: string;
}

// Define the props for the ArticleReader component
export interface ArticleReaderProps {
  article: Article; // An article object to display
  onClose: () => void; // A function to close the article reader
}

export interface ArticleCardProps {
  article: Article; // An article object to display
  onOpen: (article: Article) => void; // A function to open the selected article
}

export interface BalanceData {
  data?: {
    formatted: string;
  };
  isError: boolean;
  isLoading: boolean;
}

export interface Lesson {
  title: string;
  description: string;
  href: string;
  tier: "Beginner" | "Intermediate" | "Expert";
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
  title: string;
}

export interface Answers {
  [key: number]: string;
}

export type Lang = "en" | "fr";

export type DictType = {
  header: {
    [key: string]: string;
  };
};
