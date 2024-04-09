import React from "react";

const APRComponent = ({ APR }: { APR: number }) => {
  return (
    <>
      <span className="text-4xl font-bold text-green-500 dark:text-green-300">
        {APR}%{" "}
        <span className="text-base text-gray-700 dark:text-gray-300">APR</span>
      </span>
    </>
  );
};

export default APRComponent;
