// Import necessary React components and modules
import React from "react";
import Header from "./ui/interface/header";
import Dashboard from "@/app/ui/interface/dashboard";
import Footer from "@/app/ui/interface/footer";
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

        {/* Render the Footer component with the current page */}
        <Footer></Footer>
      </div>
    </>
  );
}
