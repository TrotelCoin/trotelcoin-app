// Import necessary React components and modules
import React from "react";
import Header from "./ui/interface/header";
import Dashboard from "@/app/ui/interface/dashboard";
import Banner from "@/app/ui/interface/banner";

// Define the Home component
export default function Home() {
  return (
    <>
      <div>
        {/* Render the Banner component */}
        <Banner></Banner>

        {/* Render the Header component with the current page */}
        <Header></Header>

        {/* Render the Dashboard component */}
        <Dashboard></Dashboard>
      </div>
    </>
  );
}
