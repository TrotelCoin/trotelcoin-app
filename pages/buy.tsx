// Import necessary React components and modules
import React from "react";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import ComingSoon from "@/components/stateless/comingSoon";

// Import metadata from the _document.js file
import { metadata } from "./_document";
import Head from "next/head";

// Define the Buy component
const Buy = () => {
  return (
    <>
      {/* Set the document title using metadata */}
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/buy"></Header>

        {/* Render the ComingSoon component */}
        <ComingSoon></ComingSoon>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/buy"></Footer>
      </div>
    </>
  );
};

// Export the Buy component as the default export
export default Buy;
