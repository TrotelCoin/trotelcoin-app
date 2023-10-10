// Import necessary React components and modules
import React, { useState } from "react";
import Header from "@/components/stateless/header";
import ArticleCard from "@/components/stateless/articleCard";
import ArticleReader from "@/components/stateless/articleReader";
import Article1 from "@/articles/article1";
import Footer from "@/components/stateless/footer";
import { metadata } from "./_document"; // Import metadata from the _document.js file
import Head from "next/head";
import { Article } from "@/components/types/types";

// Define an array of mock articles
const mockArticles: Article[] = [
  {
    id: 1,
    title:
      "Could the upcoming halving day trigger a bullish trend in the Bitcoin market?",
    category: "Bitcoin",
    image: "",
    date: "7 oct. 2023",
    author: "Alexandre Trotel",
    body: Article1,
  },
];

// Define the Articles component
const Articles = () => {
  // State variables
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Pagination settings
  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedArticles = mockArticles.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Open an article
  const openArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  // Close the currently opened article
  const closeArticle = () => {
    setSelectedArticle(null);
  };

  // Determine whether to show pagination
  const showPagination = mockArticles.length > itemsPerPage;

  return (
    <>
      {/* Set the document title using metadata */}
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/news"></Header>

        {/* Render a grid of ArticleCard components */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-4 lg:mx-10 my-8">
          {displayedArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={openArticle}
            />
          ))}
        </div>

        {/* Render pagination if necessary */}
        {showPagination && (
          <div className="m-10 items-center justify-center flex py-3">
            <ul className="flex space-x-4">
              {Array.from({
                length: Math.ceil(mockArticles.length / itemsPerPage),
              }).map((_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`${
                      currentPage === index + 1
                        ? "bg-gray-900 border-transparent dark:bg-gray-100"
                        : "bg-gray-200 text-gray-900 dark:bg-gray-400"
                    } px-3 py-0.5 rounded-full text-center text-gray-100 dark:text-gray-900 border-gray-900 border-2 dark:border-transparent`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/news"></Footer>

        {/* Render the ArticleReader component when an article is selected */}
        {selectedArticle && (
          <ArticleReader article={selectedArticle} onClose={closeArticle} />
        )}
      </div>
    </>
  );
};

// Export the Articles component as the default export
export default Articles;
