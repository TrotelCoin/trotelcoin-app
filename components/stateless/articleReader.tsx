import React from "react";
import { Article } from "@/components/types/types";

// Define the props for the ArticleReader component
interface ArticleReaderProps {
  article: Article; // An article object to display
  onClose: () => void; // A function to close the article reader
}

// Define the ArticleReader component as a functional component
const ArticleReader: React.FC<ArticleReaderProps> = ({ article, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="my-20 mx-auto p-4 lg:mx-20">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 rounded-full w-8 h-8 text-gray-100 dark:text-gray-900 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Article category and metadata */}
        <div className="flex items-center mb-4 gap-x-4">
          <div className="text-gray-600 text-xs px-3 py-1 bg-blue-200 dark:bg-blue-100 rounded-full text-center">
            <span>{article.category}</span>
          </div>
          <div className="flex-wrap flex items-center gap-x-2">
            <span className="text-gray-600 text-xs dark:text-gray-300">
              {article.date}
            </span>
            <span className="text-gray-600 text-xs dark:text-gray-300">|</span>
            <span className="text-gray-600 text-xs dark:text-gray-300">
              {article.author}
            </span>
          </div>
        </div>
        {/* Article title */}
        <h1 className="text-2xl dark:text-gray-100">{article.title}</h1>
        {/* Horizontal rule */}
        <div
          className="border-gray-200 my-4 rounded-full dark:border-gray-600"
          style={{ borderWidth: "0.5px" }}
        ></div>
        {/* Article body */}
        <span className="dark:text-gray-100">{article.body()}</span>
      </div>
    </div>
  );
};

export default ArticleReader;
