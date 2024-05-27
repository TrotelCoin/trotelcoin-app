import React from "react";

const Card = ({
  title,
  text,
  video,
}: {
  title: string;
  text: string | JSX.Element;
  video?: boolean;
}) => {
  return (
    <>
      <span className="text-gray-900 dark:text-gray-100 w-full text-center text-2xl font-semibold">
        {title}
      </span>

      {video ? (
        <>
          <div className="flex items-center justify-center w-full h-[240px] md:h-[320px]">
            {text}
          </div>
        </>
      ) : (
        <div className="text-xl text-gray-700 dark:text-gray-300 break-words whitespace-normal w-full">
          {text}
        </div>
      )}
    </>
  );
};

export default Card;
