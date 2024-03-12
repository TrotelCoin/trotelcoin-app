import React from "react";

const Card = ({
  title,
  text,
}: {
  title: string;
  text: string | JSX.Element;
}) => {
  return (
    <>
      <p className="text-xl text-gray-900 dark:text-gray-100 break-words whitespace-normal">
        {text}
      </p>
    </>
  );
};

export default Card;
