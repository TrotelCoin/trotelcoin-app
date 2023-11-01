import React from "react";
import TokenomicsChart from "@/app/ui/charts/tokenomicsChart";
import NumberOfUsers from "@/app/ui/charts/numberOfUsers";
import Header from "@/app/ui/interface/header";
import Footer from "@/app/ui/interface/footer";

const Stats = () => {
  return (
    <>
      <Header></Header>

      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
        {/* Statistics */}
        <div className="bg-blue-200 dark:bg-blue-100 border-2 col-span-1 lg:col-span-3 text-gray-900 border-gray-900 text-center shadow rounded-xl p-10 animate__animated animate__fadeIn">
          <h1 className="text-4xl">Statistics</h1>
        </div>

        {/* Tokenomics */}
        <div className="bg-white border-2 text-gray-900 border-gray-900/10 dark:border-gray-100/10 text-center shadow rounded-xl p-10 animate__animated animate__slideInLeft">
          <TokenomicsChart></TokenomicsChart>
        </div>

        {/* Number Of Users */}
        <div className="bg-white lg:col-span-2 border-2 text-gray-900 border-gray-900/10 dark:border-gray-100/10 text-center shadow rounded-xl p-10 animate__animated animate__slideInRight">
          <NumberOfUsers></NumberOfUsers>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Stats;
