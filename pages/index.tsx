// Import necessary React components and modules
import React from "react";
import Header from "../components/interface/header";
import Dashboard from "@/components/interface/dashboard";
import Footer from "@/components/interface/footer";
import Banner from "@/components/interface/banner";
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
