"use client";

import React, { useState } from "react";
import CountUp from "react-countup";
import "animate.css";
import dynamic from "next/dynamic";

const TrotelBalanceNoSSR = dynamic(
  () => import("@/app/ui/hooks/trotelBalance")
);

// Define the Dashboard component as a function
export default function Dashboard() {
  const [completed] = useState(0);
  const [trotelCoinEarnedUSD] = useState(0); // Placeholder for Trotel coin earned in USD (to be updated later)

  return (
    <div>
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden animate__animated animate__fadeIn">
        {/* Progression card */}
        <div className="bg-blue-200 border backdrop-blur-xl border-transparent dark:text-gray-700 text-gray-700 lg:col-span-3 text-center rounded-xl p-10 dark:bg-blue-200">
          <span className="text-gray-900 dark:text-gray-900 text-4xl sm:text-5xl lg:text-8xl">
            <CountUp end={completed} suffix="%"></CountUp>
          </span>
          <br></br>
          Progression
        </div>

        {/* Courses taken card */}
        <div className="bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 dark:text-gray-300 text-gray-700 text-center rounded-xl p-10 dark:bg-gray-900 animate__animated animate__slideInLeft">
          <span className="text-4xl lg:text-8xl text-blue-600 dark:text-blue-200">
            <span>0</span>
            <br></br>
          </span>
          Courses taken
        </div>

        {/* Trotel balance card */}
        <div className="bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 dark:text-gray-300 text-gray-700 text-center rounded-xl p-10 lg:col-span-2 dark:bg-gray-900 animate__animated animate__slideInRight">
          <span className="text-4xl lg:text-8xl text-blue-600 dark:text-blue-200">
            <TrotelBalanceNoSSR />
            <br />
          </span>
          Balance
        </div>

        {/* Earned Trotel coin worth card */}
        <div className="bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 dark:text-gray-300 text-gray-700 text-center rounded-xl p-10 lg:col-span-2 dark:bg-gray-900 animate__animated animate__slideInLeft">
          <span className="text-4xl lg:text-8xl text-blue-600 dark:text-blue-200">
            <span>0</span>
            <br />
          </span>
          Rewards
        </div>

        {/* Quizzes answered card */}
        <div className="bg-gray-50 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 dark:text-gray-300 text-gray-700 text-center rounded-xl p-10 dark:bg-gray-900 animate__animated animate__slideInRight">
          <span className="text-4xl lg:text-8xl text-blue-600 dark:text-blue-200">
            <span>0</span>
            <br />
          </span>
          Quizzes answered
        </div>
      </div>
    </div>
  );
}
