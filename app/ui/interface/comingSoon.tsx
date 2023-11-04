import React from "react";

// Define a functional component called ComingSoon
const ComingSoon = () => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        {/* Card with a "Coming Soon" message */}
        <div className="bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-gray-100 animate-pulse text-4xl lg:text-8xl">
            Coming soon...
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
