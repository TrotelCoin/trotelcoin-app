import React, { useState } from "react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { Fade, Slide } from "react-reveal";

// Dynamically import TrotelBalance component without server-side rendering (SSR)
const TrotelBalanceNoSSR = dynamic(
  () => import("@/components/hooks/trotelBalance"),
  {
    ssr: false,
  }
);

// Dynamically import ApproxBalanceUSD component without server-side rendering (SSR)
const ApproxBalanceUSDNoSSR = dynamic(
  () => import("@/components/hooks/approxBalanceUSD"),
  {
    ssr: false,
  }
);

// Define the Dashboard component as a function
export default function Dashboard() {
  const [completed] = useState(0);
  const [trotelCoinEarnedUSD] = useState(0); // Placeholder for Trotel coin earned in USD (to be updated later)

  return (
    <div>
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
        {/* Progression card */}
        <Fade>
          <div className="bg-blue-200 border-2 dark:text-gray-700 text-gray-700 border-gray-900 dark:border-transparent lg:col-span-3 text-center rounded-xl p-10 dark:bg-blue-100">
            <span className="text-gray-900 dark:text-gray-900 text-4xl sm:text-5xl lg:text-8xl">
              <CountUp end={completed} suffix="%"></CountUp>
            </span>
            <br></br>
            Progression
          </div>
        </Fade>

        {/* Courses taken card */}
        <Slide left>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-blue-100">
              <CountUp end={0}></CountUp>
              <br></br>
            </span>
            Courses taken
          </div>
        </Slide>

        {/* Trotel balance card */}
        <Slide right>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 lg:col-span-2 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-blue-100">
              <TrotelBalanceNoSSR />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                TROTEL
              </span>
              <br />
            </span>
            Balance worth $<ApproxBalanceUSDNoSSR />
          </div>
        </Slide>

        {/* Earned Trotel coin worth card */}
        <Slide left>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 lg:col-span-2 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-blue-100">
              <span>
                <CountUp end={0}></CountUp>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  TROTEL
                </span>
              </span>
              <br></br>
            </span>
            Earned worth ${trotelCoinEarnedUSD.toFixed(2)}
          </div>
        </Slide>

        {/* Quizzes answered card */}
        <Slide right>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-blue-100">
              <CountUp end={0}></CountUp>
              <br></br>
            </span>
            Quizzes answered
          </div>
        </Slide>
      </div>
    </div>
  );
}
