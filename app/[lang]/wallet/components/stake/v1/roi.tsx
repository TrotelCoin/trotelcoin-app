import React from "react";

const ROIComponent = ({ ROI }: { ROI: number }) => {
  return (
    <>
      <span className="text-4xl font-bold text-green-500 dark:text-green-300">
        {ROI}%{" "}
        <span className="text-base text-gray-700 dark:text-gray-300">ROI</span>
      </span>
    </>
  );
};

export default ROIComponent;
