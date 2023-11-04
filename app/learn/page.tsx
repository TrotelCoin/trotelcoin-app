// Import necessary React components and modules
import React from "react";
import Header from "@/app/ui/interface/header";
import ModulesBeginner from "@/app/ui/interface/learn/modulesBeginner";
import ModulesIntermediate from "@/app/ui/interface/learn/modulesIntermediate";
import ModulesExpert from "@/app/ui/interface/learn/modulesExpert";

// Define the Learn component
const Learn = () => {
  return (
    <>
      <div>
        <ModulesBeginner />
        {/*<ModulesIntermediate />
        <ModulesExpert />*/}
      </div>
    </>
  );
};

// Export the Learn component as the default export
export default Learn;
