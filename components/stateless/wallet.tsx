import React, { useEffect } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

// Define the Wallet component
export default function Wallet() {
  const { open } = useWeb3Modal(); // Access the open function from Web3Modal
  const { isConnected } = useAccount(); // Check if the user is connected to a wallet

  // Update the button text based on the user's wallet connection status
  useEffect(() => {
    const button = document.querySelector(".wallet-button");
    if (button) {
      button.textContent = isConnected ? "My wallet" : "Connect wallet";
    }
  }, [isConnected]);

  return (
    <button
      className="bg-blue-200 border-2 border-gray-900 dark:border-transparent hover:bg-blue-100 dark:hover:bg-blue-50 text-sm px-6 py-2 dark:bg-blue-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button"
      onClick={() => open()} // Trigger the Web3Modal open function when clicked
    >
      {isConnected ? "My wallet" : "Connect wallet"} {/* Button text */}
    </button>
  );
}
