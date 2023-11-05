import React from "react";
import { ArticleCardProps } from "@/types/types";

// Define the ArticleCard component as a functional component
const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => {
  // Handle click event when the card is clicked
  const handleCardClick = () => {
    onOpen(article); // Call the onOpen function with the selected article
  };

  return (
    <div
      className="bg-stone-50 rounded-xl overflow-hidden hover:cursor-pointer border backdrop-blur-xl border-stone-900/10 dark:border-stone-100/10 dark:bg-stone-900 hover:border-stone-900/50 dark:hover:border-stone-100/50"
      onClick={handleCardClick} // Attach the click event handler
    >
      <div className="p-6">
        {/* Display the article title */}
        <h2 className="text-xl text-stone-900 dark:text-stone-100">
          {article.title}
        </h2>
        <div className="flex-wrap flex items-center mt-4 gap-4">
          {/* Display the article category */}
          <div className="text-stone-900 text-xs px-3 py-1 bg-blue-200 dark:bg-blue-200 rounded-full text-center">
            {article.category}
          </div>
          <div className="flex-wrap flex items-center gap-x-2">
            {/* Display article date and author */}
            <span className="text-stone-600 text-xs dark:text-stone-300">
              {article.date}
            </span>
            <span className="text-stone-600 text-xs dark:text-stone-300">|</span>
            <span className="text-stone-600 text-xs dark:text-stone-300">
              {article.author}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
