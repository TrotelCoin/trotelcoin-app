// Import necessary React components and modules
import React from "react";
import Header from "../components/stateless/header";
import Dashboard from "@/components/stateless/dashboard";
import Footer from "@/components/stateless/footer";
import Banner from "@/components/stateless/banner";
import { metadata } from "./_document"; // Import metadata from the _document.js file
import Head from "next/head";

// Define the Home component
export default function Home() {
  return (
    <>
      {/* Set the document title using metadata */}
      <Head>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div>
        {/* Render the Banner component */}
        <Banner></Banner>

        {/* Render the Header component with the current page */}
        <Header currentPage="./"></Header>

        {/* Render the Dashboard component */}
        <Dashboard></Dashboard>

        {/* Render the Footer component with the current page */}
        <Footer currentPage="./"></Footer>
      </div>
    </>
  );
}
