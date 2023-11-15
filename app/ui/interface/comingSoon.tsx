import React from "react";

// Define a functional component called ComingSoon
const ComingSoon = () => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="mx-auto max-w-3xl my-20">
        {/* Card with a "Coming Soon" message */}
        <div className="mx-10 lg:mx-32 bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 hover:border-gray-900/50 dark:hover:border-gray-100/50 text-center rounded-lg p-10 dark:bg-slate-900 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-gray-100 animate-pulse text-xl">
            Coming soon
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
