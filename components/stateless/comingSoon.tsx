import React from "react";
import Fade from "react-reveal";

// Define a functional component called ComingSoon
const ComingSoon = () => {
  return (
    <Fade>
      {/* Container for the "Coming Soon" message */}
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        {/* Card with a "Coming Soon" message */}
        <div className="bg-white border-2 border-gray-900/10 dark:border-gray-100/10 text-center rounded-xl p-10 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          {/* Text displaying "Coming Soon" */}
          <span className="text-gray-900 dark:text-blue-100 animate-pulse text-4xl lg:text-8xl">
            Bientôt disponible...
          </span>
        </div>
      </div>
    </Fade>
  );
};

export default ComingSoon;
