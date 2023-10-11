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

export type User = {
  id: number; // A unique identifier for the user
  walletAddress: string; // The user's wallet address
  email: string; // The user's email address
  hasSigned: boolean; // If the user has signed
};
