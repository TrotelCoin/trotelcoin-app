// Import necessary React components and modules
import React from "react";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import Modules from "@/components/stateless/modules";
import Head from "next/head";
import { metadata } from "@/pages/_document";

// Define the Courses component
const Courses = () => {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
      </Head>
      <div>
        {/* Render the Header component with the current page */}
        <Header currentPage="/courses"></Header>

        {/* Render the Modules component */}
        <Modules></Modules>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="/courses"></Footer>
      </div>
    </>
  );
};

// Export the Courses component as the default export
export default Courses;
