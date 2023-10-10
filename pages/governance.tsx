// Import necessary React components and modules
import React from "react";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import ComingSoon from "@/components/stateless/comingSoon";
import { metadata } from "./_document"; // Import metadata from the _document.js file
import Head from "next/head";

// Define the Governance component
const Governance = () => {
  return (
    <>
      {/* Set the document title using metadata */}
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/governance"></Header>

        {/* Render the ComingSoon component */}
        <ComingSoon></ComingSoon>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/governance"></Footer>
      </div>
    </>
  );
};

// Export the Governance component as the default export
export default Governance;
