// Import necessary React components and modules
import React from "react";
import Header from "@/app/ui/interface/header";
import Footer from "@/app/ui/interface/footer";
import Modules from "@/app/ui/interface/learn/modules";

// Define the Learn component
const Learn = () => {
  return (
    <>
      <div>
        {/* Render the Header component with the current page */}
        <Header></Header>

        {/* Render the Modules component */}
        <Modules></Modules>

        {/* Render the Footer component with the current page */}
        <Footer></Footer>
      </div>
    </>
  );
};

// Export the Learn component as the default export
export default Learn;
