import React, { useState } from "react";
import dynamic from "next/dynamic";
import CountUp from "react-countup";
import { Fade, Slide } from "react-reveal";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next

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
  const { t } = useTranslation(); // Initialize the translation function

  const [completed] = useState(0);
  const [trotelCoinEarnedUSD] = useState(0); // Placeholder for Trotel coin earned in USD (to be updated later)

  return (
    <div>
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
        {/* Progression card */}
        <Fade>
          <div className="bg-yellow-200 border-2 dark:text-gray-700 text-gray-700 border-gray-900 dark:border-transparent lg:col-span-3 text-center rounded-xl p-10 dark:bg-yellow-100">
            <span className="text-gray-900 dark:text-gray-900 text-4xl sm:text-5xl lg:text-8xl">
              <CountUp end={completed} suffix="%"></CountUp>
            </span>
            <br></br>
            {t("Progression")} {/* Translate this string */}
          </div>
        </Fade>

        {/* Courses taken card */}
        <Slide left>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-yellow-100">
              <CountUp end={0}></CountUp>
              <br></br>
            </span>
            {t("Courses taken")} {/* Translate this string */}
          </div>
        </Slide>

        {/* Trotel balance card */}
        <Slide right>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 lg:col-span-2 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-yellow-100">
              <TrotelBalanceNoSSR />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                TROTEL
              </span>
              <br />
            </span>
            {t("Balance worth $", { value: <ApproxBalanceUSDNoSSR /> })}{" "}
            {/* Translate this string */}
          </div>
        </Slide>

        {/* Earned Trotel coin worth card */}
        <Slide left>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 lg:col-span-2 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-yellow-100">
              <span>
                <CountUp end={0}></CountUp>
                <span className="text-xs text-gray-700 dark:text-gray-300">
                  TROTEL
                </span>
              </span>
              <br></br>
            </span>
            {t("Earned worth ${{value}}", {
              value: trotelCoinEarnedUSD.toFixed(2),
            })}{" "}
            {/* Translate this string with variable interpolation */}
          </div>
        </Slide>

        {/* Quizzes answered card */}
        <Slide right>
          <div className="bg-gray-50 border-2 dark:text-gray-300 text-gray-700 border-gray-900 dark:border-transparent text-center shadow rounded-xl p-10 dark:bg-gray-800">
            <span className="text-4xl lg:text-8xl text-gray-900 dark:text-yellow-100">
              <CountUp end={0}></CountUp>
              <br></br>
            </span>
            {t("Quizzes answered")} {/* Translate this string */}
          </div>
        </Slide>
      </div>
    </div>
  );
}
