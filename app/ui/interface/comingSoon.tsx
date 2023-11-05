import React from "react";

// Define a functional component called ComingSoon
const ComingSoon = () => {
  return (
    <>
      {/* Container for the "Coming Soon" message */}
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        {/* Card with a "Coming Soon" message */}
        <div className="bg-stone-50 border backdrop-blur-xl border-stone-900/10 dark:border-stone-100/10 text-center rounded-xl p-10 dark:bg-stone-900 text-stone-900 dark:text-stone-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-stone-900 dark:text-stone-100 animate-pulse text-4xl lg:text-8xl">
            Coming soon...
          </span>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
