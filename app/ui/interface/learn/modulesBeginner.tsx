"use client";

// Import necessary React components and modules
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import "animate.css";
import { Module, Submodule } from "@/types/types";

// Define the Module interface

// Define CSS classes for different statuses and environments
const statuses: Record<string, string> = {
  Ready: "text-gray-500 bg-gray-400/20 dark:text-gray-200 dark:bg-gray-200/10",
  Finished:
    "text-green-500 bg-green-400/20 dark:text-green-200 dark:bg-green-200/10",
  Ongoing:
    "text-yellow-500 bg-yellow-400/20 dark:text-yellow-200 dark:bg-yellow-200/10",
};

const environments: Record<string, string> = {
  "Coming soon":
    "text-gray-900 bg-gray-500/10 ring-gray-500/30 dark:text-gray-200 dark:bg-gray-200/10 dark:ring-gray-200/30",
  Ready:
    "text-gray-900 bg-gray-500/10 ring-gray-500/30 dark:text-gray-200 dark:bg-gray-200/10 dark:ring-gray-200/30",
  Finished:
    "text-green-900 bg-green-500/10 ring-green-500/30 dark:text-green-200 dark:bg-green-200/10 dark:ring-green-200/30",
  Ongoing:
    "text-yellow-900 bg-yellow-500/10 ring-yellow-500/30 dark:text-yellow-200 dark:bg-yellow-200/10 dark:ring-yellow-200/30",
};

// Define an array of mock modules and submodules
const modules: Module[] = [
  // Module 1
  {
    id: 1,
    href: "#",
    module: "Create your wallet",
    status: "Ready",
    statusText: "0%",
    description:
      "Learn how to set up and manage your digital wallet for secure and convenient financial transactions",
    environment: "Coming soon",
    submodules: [
      {
        id: 11,
        href: "",
        module: "Introduction to wallets",
        status: "Ready",
        description:
          "Overview of digital wallets and their importance in the cryptocurrency world",
        environment: "Coming soon",
      },
      {
        id: 12,
        href: "",
        module: "Secure your wallet",
        status: "Ready",
        description:
          "Learn best practices for securing your digital wallet and keeping your cryptocurrencies safe",
        environment: "Coming soon",
      },
    ],
  },
  // Module 2
  {
    id: 2,
    href: "#",
    module: "Discover Bitcoin",
    status: "Ready",
    statusText: "0%",
    description:
      "Explore the world of bitcoin and gain a comprehensive understanding of its technology, use and implications",
    environment: "Coming soon",
    submodules: [
      {
        id: 21,
        href: "",
        module: "History of Bitcoin",
        status: "Ready",
        description:
          "Learn the basics of Bitcoin, its history and its underlying technology, the blockchain",
        environment: "Coming soon",
      },
      {
        id: 22,
        href: "",
        module: "Bitcoin mining",
        status: "Ready",
        description:
          "Dive into the Bitcoin mining process and how it supports the network",
        environment: "Coming soon",
      },
    ],
  },
  // Module 3
  {
    id: 3,
    href: "#",
    module: "Discover Ethereum",
    status: "Ready",
    statusText: "0%",
    description:
      "Dive into the world of Ethereum to discover its technology, applications and potential impact on the future of decentralized computing and finance",
    environment: "Coming soon",
    submodules: [
      {
        id: 31,
        href: "",
        module: "What's Ethereum ?",
        status: "Ready",
        description:
          "Introduction to Ethereum, its founder and its objectives in the world of blockchain technology",
        environment: "Coming soon",
      },
      {
        id: 32,
        href: "",
        module: "Smart Contracts",
        status: "Ready",
        description:
          "Exploring the concept of smart contracts and their role in decentralized applications (DApps)",
        environment: "Coming soon",
      },
    ],
  },
];

// Helper function to concatenate CSS classes
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

// Define the Modules component
export default function ModulesBeginner() {
  const [expandedModules, setExpandedModules] = useState<number[]>([]);
  const [selectedModule, setSelectedModule] = useState<
    Module | Submodule | null
  >(null);

  // Create a mapping from environment to status
  const environmentToStatusMapping: Record<string, string> = {
    "Coming soon": "Ready",
    Ready: "Ready",
    Finished: "Finished",
    Ongoing: "Ongoing",
  };

  // Calculate statusText for a module based on its submodules
  const calculateStatusText = (module: Module) => {
    const TerminéSubmodules = module.submodules.filter(
      (submodule) => submodule.environment === "Finished"
    );
    const statusText =
      ((TerminéSubmodules.length / module.submodules.length) * 100).toFixed(0) +
      "%";
    return statusText;
  };

  // Iterate through modules and calculate statusText for each
  modules.forEach((module) => {
    module.status = environmentToStatusMapping[module.environment] as
      | "Ready"
      | "Finished"
      | "Ongoing";
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
      <div className="border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-xl bg-gray-50 dark:bg-gray-900 px-10 py-5 overflow-hidden animate__animated animate__fadeIn">
        <h2 className="text-xl text-gray-900 mt-6 dark:text-gray-100 font-semibold">
          {selectedModule ? selectedModule.module : "Beginner"}
        </h2>
        {renderModuleList()}
        {renderSubmodules()}
        {selectedModule && (
          <button
            onClick={handleGoBack}
            className="bg-blue-200 hover:bg-blue-200/80 dark:hover:bg-blue-200/80 text-sm px-6 py-2 dark:bg-blue-200 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover.text-gray-900 rounded-full font-semibold cursor-pointer"
          >
            Go back
          </button>
        )}
      </div>
    </div>
  );
}
