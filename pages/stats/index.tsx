import React from "react";
import { Slide, Fade } from "react-reveal";
import TokenomicsChart from "@/components/charts/tokenomicsChart";
import NumberOfUsers from "@/components/charts/numberOfUsers";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import Head from "next/head";
import { metadata } from "@/pages/_document";

const Stats = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <Header currentPage="/stats"></Header>

      {/* Grid layout with responsive columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
        {/* Statistics */}
        <Fade>
          <div className="bg-blue-200 dark:bg-blue-100 border-2 col-span-1 lg:col-span-3 text-gray-900 border-gray-900 text-center shadow rounded-xl p-10">
            <h1 className="text-4xl">Statistics</h1>
          </div>
        </Fade>

        {/* Tokenomics */}
        <Slide left>
          <div className="bg-white border-2 text-gray-900 border-gray-900/10 dark:border-gray-100/10 text-center shadow rounded-xl p-10">
            <TokenomicsChart></TokenomicsChart>
          </div>
        </Slide>

        {/* Number Of Users */}
        <Slide right>
          <div className="bg-white lg:col-span-2 border-2 text-gray-900 border-gray-900/10 dark:border-gray-100/10 text-center shadow rounded-xl p-10">
            <NumberOfUsers></NumberOfUsers>
          </div>
        </Slide>
      </div>

      <Footer currentPage="/stats"></Footer>
    </>
  );
};

export default Stats;
