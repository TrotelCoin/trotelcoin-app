// Import necessary React components and modules
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import { Fade } from "react-reveal";

// Define the Module interface
interface Module {
  id: number;
  href: string;
  module: string;
  status: "Prêt" | "Terminé" | "En cours";
  statusText: string;
  description: string;
  environment: "Bientôt disponible" | "Prêt" | "Terminé" | "En cours";
  submodules: Submodule[];
}

// Define the Submodule interface
interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "Prêt" | "Terminé" | "En cours";
  environment: "Bientôt disponible" | "Prêt" | "Terminé" | "En cours";
  description: string;
}

// Define CSS classes for different statuses and environments
const statuses: Record<string, string> = {
  Prêt: "text-gray-500 bg-gray-400/20 dark:text-gray-200 dark:bg-gray-200/10",
  Terminé:
    "text-green-500 bg-green-400/20 dark:text-green-200 dark:bg-green-200/10",
  "En cours":
    "text-yellow-500 bg-yellow-400/20 dark:text-yellow-200 dark:bg-yellow-200/10",
};

const environments: Record<string, string> = {
  "Bientôt disponible":
    "text-gray-800 bg-gray-500/10 ring-gray-500/30 dark:text-gray-200 dark:bg-gray-200/10 dark:ring-gray-200/30",
  Prêt: "text-gray-800 bg-gray-500/10 ring-gray-500/30 dark:text-gray-200 dark:bg-gray-200/10 dark:ring-gray-200/30",
  Terminé:
    "text-green-800 bg-green-500/10 ring-green-500/30 dark:text-green-200 dark:bg-green-200/10 dark:ring-green-200/30",
  "En cours":
    "text-yellow-800 bg-yellow-500/10 ring-yellow-500/30 dark:text-yellow-200 dark:bg-yellow-200/10 dark:ring-yellow-200/30",
};

// Define an array of mock modules and submodules
const modules: Module[] = [
  // Module 1
  {
    id: 1,
    href: "#",
    module: "Créer son portefeuille",
    status: "Prêt",
    statusText: "0%",
    description:
      "Apprenez à configurer et à gérer votre portefeuille numérique pour des transactions financières sûres et pratiques",
    environment: "Bientôt disponible",
    submodules: [
      {
        id: 11,
        href: "",
        module: "Introduction aux portefeuilles",
        status: "Prêt",
        description:
          "Aperçu des portefeuilles numériques et de leur importance dans le monde des crypto-monnaies",
        environment: "Bientôt disponible",
      },
      {
        id: 12,
        href: "",
        module: "Sécuriser son portefeuille",
        status: "Prêt",
        description:
          "Apprenez les meilleures pratiques pour sécuriser votre portefeuille numérique et garder vos crypto-monnaies en sécurité",
        environment: "Bientôt disponible",
      },
    ],
  },
  // Module 2
  {
    id: 2,
    href: "#",
    module: "Découvrir Bitcoin",
    status: "Prêt",
    statusText: "0%",
    description:
      "Explorer le monde du bitcoin et acquérir une compréhension globale de sa technologie, de son utilisation et de ses implications",
    environment: "Bientôt disponible",
    submodules: [
      {
        id: 21,
        href: "",
        module: "C'est quoi Bitcoin ?",
        status: "Prêt",
        description:
          "Apprenez les bases de Bitcoin, son histoire et sa technologie sous-jacente, la blockchain",
        environment: "Bientôt disponible",
      },
      {
        id: 22,
        href: "",
        module: "Le minage de Bitcoin",
        status: "Prêt",
        description:
          "Plongez dans le processus de minage de Bitcoin et la façon dont il soutient le réseau",
        environment: "Bientôt disponible",
      },
    ],
  },
  // Module 3
  {
    id: 3,
    href: "#",
    module: "Découvrir Ethereum",
    status: "Prêt",
    statusText: "0%",
    description:
      "Plongez dans le monde d'Ethereum pour découvrir sa technologie, ses applications et son impact potentiel sur l'avenir de l'informatique et des finances décentralisées",
    environment: "Bientôt disponible",
    submodules: [
      {
        id: 31,
        href: "",
        module: "C'est quoi Ethereum ?",
        status: "Prêt",
        description:
          "Présentation d'Ethereum, de son fondateur et de ses objectifs dans le monde de la technologie blockchain",
        environment: "Bientôt disponible",
      },
      {
        id: 32,
        href: "",
        module: "Les Smart Contracts",
        status: "Prêt",
        description:
          "Explorer le concept des contrats intelligents et leur rôle dans les applications décentralisées (DApps)",
        environment: "Bientôt disponible",
      },
    ],
  },
];

// Helper function to concatenate CSS classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define the Modules component
export default function Modules() {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [selectedModule, setSelectedModule] = useState<
    Module | Submodule | null
  >(null);

  // Create a mapping from environment to status
  const environmentToStatusMapping: Record<string, string> = {
    "Bientôt disponible": "Prêt",
    Prêt: "Prêt",
    Terminé: "Terminé",
    "En cours": "En cours",
  };

  // Calculate statusText for a module based on its submodules
  const calculateStatusText = (module: Module) => {
    const TerminéSubmodules = module.submodules.filter(
      (submodule) => submodule.environment === "Terminé"
    );
    const statusText =
      ((TerminéSubmodules.length / module.submodules.length) * 100).toFixed(0) +
      "%";
    return statusText;
  };

  // Iterate through modules and calculate statusText for each
  modules.forEach((module) => {
    module.status = environmentToStatusMapping[module.environment] as
      | "Prêt"
      | "Terminé"
      | "En cours";
    module.statusText = calculateStatusText(module);
  });

  // Handle click event to open or close a module
  const handleModuleClick = (module: Module) => {
    if (selectedModule === module) {
      setSelectedModule(null);
    } else {
      setSelectedModule(module);
    }
  };

  // Handle click event to open or close a submodule
  const handleSubModuleClick = (submodule: Submodule) => {
    if (selectedModule === submodule) {
      setSelectedModule(null);
    } else {
      setSelectedModule(submodule);
    }
  };

  // Handle click event to go back to the list of modules
  const handleGoBack = () => {
    setSelectedModule(null);
  };

  // Render a list of modules
  const renderModuleList = () => {
    return (
      <ul
        role="list"
        className={`divide-y my-6 divide-black/10 dark:divide-white/10 ${
          selectedModule ? "hidden" : "block"
        }`}
      >
        {modules.map((module) => (
          <li
            key={module.id}
            className="relative flex items-center space-x-4 py-4 cursor-pointer"
            onClick={() => handleModuleClick(module)}
          >
            {/* Module content */}
            <div className="min-w-0 flex-auto">
              <div className="flex items-center gap-x-3">
                <div
                  className={classNames(
                    statuses[module.status],
                    "flex-none rounded-full p-1"
                  )}
                >
                  <div className="h-2 w-2 rounded-full bg-current" />
                </div>
                <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                  <a href={module.href} className="flex gap-x-2">
                    <span className="whitespace-nowrap">{module.module}</span>
                    <span className="absolute inset-0" />
                  </a>
                </h2>
              </div>
              <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-600 dark:text-gray-400">
                <p className="truncate">{module.description}</p>
                <svg
                  viewBox="0 0 2 2"
                  className="h-0.5 w-0.5 flex-none fill-gray-500 dark:fill-gray-300"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <p className="whitespace-nowrap">{module.statusText}</p>
              </div>
            </div>
            <div className="items-center flex gap-x-4">
              <div
                className={classNames(
                  environments[module.environment],
                  "hidden lg:flex rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {module.environment}
              </div>
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-600 dark:text-gray-400"
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Render the submodules for the selected module
  const renderSubmodules = () => {
    if (selectedModule) {
      return (
        <ul
          role="list"
          className={`divide-y my-6 divide-black/10 dark:divide-white/10 ${
            selectedModule ? "block" : "hidden"
          }`}
        >
          {(selectedModule as Module).submodules.map((submodule: Submodule) => (
            <li
              key={submodule.id}
              className="relative flex items-center space-x-4 py-4 cursor-pointer"
              onClick={() => handleSubModuleClick(submodule)}
            >
              {/* Submodule content */}
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div
                    className={classNames(
                      statuses[submodule.status],
                      "flex-none rounded-full p-1"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    <a href={submodule.href} className="flex gap-x-2">
                      <span className="whitespace-nowrap">
                        {submodule.module}
                      </span>
                      <span className="absolute inset-0" />
                    </a>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-600 dark:text-gray-400">
                  <p className="truncate">{submodule.description}</p>
                </div>
              </div>
              <div className="items-cente flex gap-x-4">
                <div
                  className={classNames(
                    environments[submodule.environment],
                    "hidden lg:flex rounded-full flex-none py-1 px-2 text-xs font-medium ring-1 ring-inset"
                  )}
                >
                  {submodule.environment}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 flex-none text-gray-600 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </div>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  // Render the module list or a selected module's submodules
  return (
    <div className="lg:mx-10 mx-4 my-8">
      <Fade>
        <div className="border-2 border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-gray-50 dark:bg-gray-800 px-10 py-5 overflow-hidden">
          <h2 className="text-xl text-gray-900 mt-6 dark:text-gray-100 font-semibold">
            {selectedModule ? selectedModule.module : "Apprendre"}
          </h2>
          {renderModuleList()}
          {renderSubmodules()}
          {selectedModule && (
            <button
              onClick={handleGoBack}
              className="bg-yellow-200 hover:bg-yellow-200/80 dark:hover:bg-yellow-100/80 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover.text-gray-900 rounded-full font-semibold cursor-pointer"
            >
              Retour
            </button>
          )}
        </div>
      </Fade>
    </div>
  );
}
