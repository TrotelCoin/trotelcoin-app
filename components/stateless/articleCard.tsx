import React from "react";
import { Article } from "./types";

interface ArticleCardProps {
  article: Article;
  onOpen: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => {
  const handleCardClick = () => {
    onOpen(article);
  };

  return (
    <div
      className="bg-gray-50 shadow rounded-2xl overflow-hidden hover:cursor-pointer border-2 border-gray-900 dark:border-transparent dark:bg-gray-800 hover:shadow-md hover:bg-white dark:hover:bg-gray-700"
      onClick={handleCardClick}
    >
      <div className="p-6">
        <h2 className="text-xl text-gray-900 dark:text-gray-100">
          {article.title}
        </h2>
        <div className="flex-wrap flex items-center mt-4 gap-x-4">
          <div className="text-gray-600 text-xs px-3 py-1 bg-blue-200 dark:bg-blue-100 rounded-full text-center">
            {article.category}
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
      </div>
    </div>
  );
};

export default ArticleCard;
