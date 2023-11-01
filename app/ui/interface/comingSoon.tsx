import React from "react";
import "animate.css";

// Define a functional component called ComingSoon
const ComingSoon = () => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden animate__animated animate__fadeIn">
        {/* Card with a "Coming Soon" message */}
        <div className="bg-white border-2 border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-10 dark:bg-black text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-blue-100 animate-pulse text-4xl lg:text-8xl">
            Coming soon...
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
