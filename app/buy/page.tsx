// Import necessary React components and modules
import React from "react";
import Header from "@/app/ui/interface/header";
import Footer from "@/app/ui/interface/footer";

// Import metadata from the _document.js file
import SwapInterface from "@/app/ui/interface/swapInterface";

// Define the Buy component
const Buy = () => {
  return (
    <>
      <div>
        {/* Render the Header component with the current page */}
        <Header></Header>

        {/* Render the SwapInterface component */}
        <SwapInterface></SwapInterface>

        {/* Render the Footer component with the current page */}
        <Footer></Footer>
      </div>
    </>
  );
};

// Export the Buy component as the default export
export default Buy;
