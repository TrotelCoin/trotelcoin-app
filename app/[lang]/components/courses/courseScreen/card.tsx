import React, { useEffect, useState } from "react";

const Card = ({
  title,
  text,
  currentIndex,
  setCurrentIndex,
  pause,
  video,
}: {
  title: string;
  text: string | JSX.Element;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  pause: boolean;
  video?: boolean;
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const delay: number = 10;

  useEffect(() => {
    if (isTyping && !pause) {
      if (typeof text === "string") {
        if (currentIndex < text.length) {
          const timeout = setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, delay);

          return () => clearTimeout(timeout);
        } else {
          setIsTyping(false);
        }
      }
    }
  }, [currentIndex, text, isTyping, pause]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsTyping(true);
  }, [text]);

  return (
    <>
      <span className="text-gray-900 dark:text-gray-100 w-full text-center text-2xl font-semibold">
        {typeof text === "string" ? !pause && title : title}
      </span>

      {video ? (
        <>
          <div className="flex items-center justify-center w-full h-[240px] md:h-[320px]">
            {text}
          </div>
        </>
      ) : (
        <div className="text-xl text-gray-700 dark:text-gray-300 break-words whitespace-normal w-full">
          {typeof text === "string"
            ? !pause &&
              text.split("").map((char, index) => (
                <span
                  key={index}
                  style={{
                    transition: "opacity 0.1s",
                    opacity: index < currentIndex ? 1 : 0,
                  }}
                >
                  {char}
                </span>
              ))
            : text}
        </div>
      )}
    </>
  );
};

export default Card;
