import React from "react";
import Article from "@/components/types/article";

// Define the props for the ArticleCard component
interface ArticleCardProps {
  article: Article; // An article object to display
  onOpen: (article: Article) => void; // A function to open the selected article
}

// Define the ArticleCard component as a functional component
const ArticleCard: React.FC<ArticleCardProps> = ({ article, onOpen }) => {
  // Handle click event when the card is clicked
  const handleCardClick = () => {
    onOpen(article); // Call the onOpen function with the selected article
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden hover:cursor-pointer border-2 border-gray-900/10 dark:border-gray-100/10 dark:bg-gray-900 hover:border-gray-900/50 dark:hover:border-gray-100/50"
      onClick={handleCardClick} // Attach the click event handler
    >
      <div className="p-6">
        {/* Display the article title */}
        <h2 className="text-xl text-gray-900 dark:text-gray-100">
          {article.title}
        </h2>
        <div className="flex-wrap flex items-center mt-4 gap-4">
          {/* Display the article category */}
          <div className="text-gray-600 text-xs px-3 py-1 bg-blue-200 dark:bg-blue-100 rounded-full text-center">
            {article.category}
          </div>
          <div className="flex-wrap flex items-center gap-x-2">
            {/* Display article date and author */}
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
