// Import necessary React components and modules
import React from "react";
import Header from "@/components/interface/header";
import Footer from "@/components/interface/footer";
import Modules from "@/components/interface/modules";
import Head from "next/head";
import { metadata } from "@/pages/_document";

// Define the Learn component
const Learn = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/learn"></Header>

        {/* Render the Modules component */}
        <Modules></Modules>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/learn"></Footer>
      </div>
    </>
  );
};

// Export the Learn component as the default export
export default Learn;
