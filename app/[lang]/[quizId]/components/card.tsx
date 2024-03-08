import React from "react";

const Card = ({ title, text }: { title: string; text: string }) => {
  return (
    <>
      <div className="break-words whitespace-normal">
        <h1 className="font-semibold mb-2 md:text-2xl text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="font-light text-sm md:text-base text-gray-900 dark:text-gray-100">{text}</p>
      </div>
    </>
  );
};

export default Card;
