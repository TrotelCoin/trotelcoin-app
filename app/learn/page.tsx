// Import necessary React components and modules
import React from "react";
import Header from "@/app/ui/interface/header";
import Footer from "@/app/ui/interface/footer";
import ModulesBeginner from "@/app/ui/interface/learn/modulesBeginner";
import ModulesIntermediate from "@/app/ui/interface/learn/modulesIntermediate";
import ModulesExpert from "@/app/ui/interface/learn/modulesExpert";

// Define the Learn component
const Learn = () => {
  return (
    <>
      <div>
        {/* Render the Header component with the current page */}
        <Header />

        {/* Render the Modules component */}
        <ModulesBeginner />
        {/*<ModulesIntermediate />
        <ModulesExpert />*/}

        {/* Render the Footer component with the current page */}
        <Footer />
      </div>
    </>
  );
};

// Export the Learn component as the default export
export default Learn;
