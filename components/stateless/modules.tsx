// Import necessary React components and modules
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

// Define the Module interface
interface Module {
  id: number;
  href: string;
  module: string;
  status: "ready" | "finished" | "ongoing";
  statusText: string;
  description: string;
  environment: "Ready" | "Finished" | "Ongoing";
  submodules: Submodule[];
}

// Define the Submodule interface
interface Submodule {
  id: number;
  href: string;
  module: string;
  status: "ready" | "finished" | "ongoing";
  statusText: string;
  environment: "Ready" | "Finished" | "Ongoing";
  description: string;
}

// Define CSS classes for different statuses and environments
const statuses: Record<string, string> = {
  ready: "text-gray-500 bg-gray-400/20 dark:text-gray-200 dark:bg-gray-200/10",
  finished:
    "text-green-500 bg-green-400/20 dark:text-green-200 dark:bg-green-200/10",
  ongoing:
    "text-yellow-500 bg-yellow-400/20 dark:text-yellow-200 dark:bg-yellow-200/10",
};

const environments: Record<string, string> = {
  Ready:
    "text-gray-800 bg-gray-500/10 ring-gray-500/30 dark:text-gray-200 dark:bg-gray-200/10 dark:ring-gray-200/30",
  Finished:
    "text-green-800 bg-green-500/10 ring-green-500/30 dark:text-green-200 dark:bg-green-200/10 dark:ring-green-200/30",
  Ongoing:
    "text-yellow-800 bg-yellow-500/10 ring-yellow-500/30 dark:text-yellow-200 dark:bg-yellow-200/10 dark:ring-yellow-200/30",
};

// Define an array of mock modules and submodules
const modules: Module[] = [
  // Module 1
  {
    id: 1,
    href: "#",
    module: "Create your wallet",
    status: "ready",
    statusText: "0%",
    description:
      "Learn how to set up and manage your digital wallet for secure and convenient financial transactions",
    environment: "Ready",
    submodules: [
      {
        id: 11,
        href: "",
        module: "Introduction to Wallets",
        status: "ready",
        statusText: "0%",
        description:
          "Get an overview of digital wallets and their importance in the world of cryptocurrency",
        environment: "Ready",
      },
      {
        id: 12,
        href: "",
        module: "Securing Your Wallet",
        status: "ready",
        statusText: "0%",
        description:
          "Learn best practices for securing your digital wallet and keeping your cryptocurrencies safe",
        environment: "Ready",
      },
    ],
  },
  // Module 2
  {
    id: 2,
    href: "#",
    module: "Discover Bitcoin",
    status: "ready",
    statusText: "0%",
    description:
      "Explore the world of Bitcoin and gain a comprehensive understanding of its technology, uses, and implications",
    environment: "Ready",
    submodules: [
      {
        id: 21,
        href: "",
        module: "What is Bitcoin?",
        status: "ready",
        statusText: "0%",
        description:
          "Learn the basics of Bitcoin, its history, and its underlying technology, blockchain",
        environment: "Ready",
      },
      {
        id: 22,
        href: "",
        module: "Bitcoin Mining",
        status: "ready",
        statusText: "0%",
        description:
          "Dive into the process of Bitcoin mining and how it supports the network",
        environment: "Ready",
      },
    ],
  },
  // Module 3
  {
    id: 3,
    href: "#",
    module: "Discover Ethereum",
    status: "ready",
    statusText: "0%",
    description:
      "Delve into the realm of Ethereum to uncover its technology, applications, and potential impact on the future of decentralized computing and finances",
    environment: "Ready",
    submodules: [
      {
        id: 31,
        href: "",
        module: "Introduction to Ethereum",
        status: "ready",
        statusText: "0%",
        description:
          "Get introduced to Ethereum, its founder, and its goals in the world of blockchain technology",
        environment: "Ready",
      },
      {
        id: 32,
        href: "",
        module: "Smart Contracts",
        status: "ready",
        statusText: "0%",
        description:
          "Explore the concept of smart contracts and their role in decentralized applications (DApps)",
        environment: "Ready",
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
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);

  // Handle click event to open a module
  const handleModuleClick = (module: Module) => {
    setSelectedModule(module);
  };

  // Handle click event to go back to the main module list
  const handleGoBack = () => {
    setSelectedModule(null);
  };

  // Render a list of modules or submodules
  const renderModuleList = (moduleList: (Module | Submodule)[]) => {
    return (
      <>
        <ul
          role="list"
          className="divide-y my-6 divide-black/10 dark:divide-white/10"
        >
          {moduleList.map((module) => (
            <li
              key={module.id}
              className="relative flex items-center space-x-4 py-4 cursor-pointer"
              onClick={() => handleModuleClick(module as Module)}
            >
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
            </li>
          ))}
        </ul>
      </>
    );
  };

  // Render the module list or a selected module's submodules
  if (selectedModule) {
    return (
      <div className="lg:mx-10 mx-4 my-8 shadow border-2 border-gray-900 dark:border-transparent rounded-xl bg-gray-50 dark:bg-gray-800 px-10 py-5">
        <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          {selectedModule.module}
        </h2>
        {renderModuleList(selectedModule.submodules)}
        <button
          onClick={handleGoBack}
          className="bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover:bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover.text-gray-900 rounded-full font-semibold cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  } else {
    return (
      <div className="lg:mx-10 mx-4 my-8 shadow border-2 border-gray-900 dark:border-transparent rounded-xl bg-gray-50 dark:bg-gray-800 px-10 py-5">
        <h2 className="text-xl text-gray-900 dark:text-gray-100 font-semibold">
          Courses
        </h2>
        {renderModuleList(modules)}
      </div>
    );
  }
}
