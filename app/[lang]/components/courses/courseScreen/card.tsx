import React from "react";

const Card = ({
  title,
  text,
  video
}: {
  title: string;
  text: string | JSX.Element;
  video?: boolean;
}) => {
  return (
    <>
      <span className="w-full text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </span>

      {video ? (
        <>
          <div className="flex h-[240px] w-full items-center justify-center md:h-[320px]">
            {text}
          </div>
        </>
      ) : (
        <div className="w-full whitespace-normal break-words text-xl text-gray-700 dark:text-gray-300">
          {text}
        </div>
      )}
    </>
  );
};

export default Card;
