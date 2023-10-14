// Import necessary React components and modules
import React from "react";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import Head from "next/head";
import { metadata } from "@/pages/_document";

// Import metadata from the _document.js file
import SwapInterface from "@/components/stateless/swapInterface";

// Define the Buy component
const Buy = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/buy"></Header>

        {/* Render the SwapInterface component */}
        <SwapInterface></SwapInterface>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/buy"></Footer>
      </div>
    </>
  );
};

// Export the Buy component as the default export
export default Buy;
