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
        <Banner />
        <Dashboard />
      </div>
    </>
  );
}
