import React from "react";
import { Slide, Fade } from "react-reveal";
import TokenomicsChart from "@/components/charts/tokenomicsChart";
import NumberOfUsers from "@/components/charts/numberOfUsers";

const Stats = () => {
  return (
    <>
      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
        {/* Statistics */}
        <Fade>
          <div className="bg-yellow-200 dark:bg-yellow-100 border-2 col-span-3 text-gray-900 border-gray-900 text-center shadow rounded-xl p-10">
            <h1 className="text-4xl">Statistics</h1>
          </div>
        </Fade>

        {/* Tokenomics */}
        <Slide left>
          <div className="bg-gray-50 border-2 text-gray-900 border-gray-900 text-center shadow rounded-xl p-10">
            <TokenomicsChart></TokenomicsChart>
          </div>
        </Slide>

        {/* Number Of Users */}
        <Slide right>
          <div className="bg-gray-50 lg:col-span-2 border-2 text-gray-900 border-gray-900 text-center shadow rounded-xl p-10">
            <NumberOfUsers></NumberOfUsers>
          </div>
        </Slide>
      </div>
    </>
  );
};

export default Stats;
