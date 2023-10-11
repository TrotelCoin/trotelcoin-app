// Import necessary React components and modules
import React from "react";
import Header from "@/components/stateless/header";
import Footer from "@/components/stateless/footer";
import Modules from "@/components/stateless/modules";

// Define interfaces for the Module and Submodule data structures
interface Module {
  title: string;
  submodules: Submodule[];
}

interface Submodule {
  title: string;
  course: string;
}

// Define an array of modules and submodules with their titles and course URLs
const modules: Module[] = [
  {
    title: "Les Bases de la Crypto",
    submodules: [
      {
        title: "Qu'est-ce que la Cryptographie ?",
        course: "URL_du_cours_pour_ce_sous_module",
      },
      {
        title: "Sécurité des Clés Privées",
        course: "URL_du_cours_pour_ce_sous_module",
      },
    ],
  },
  {
    title: "Découvrir Bitcoin et Ethereum",
    submodules: [
      {
        title: "Bitcoin : Fonctionnement",
        course: "URL_du_cours_pour_ce_sous_module",
      },
      {
        title: "Ethereum : Introduction",
        course: "URL_du_cours_pour_ce_sous_module",
      },
    ],
  },
];

// Define the Courses component
const Courses = () => {
  return (
    <>
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
