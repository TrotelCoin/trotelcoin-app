import React, { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useSignMessage, useAccount } from "wagmi";

export default function Wallet() {
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Log in to the TrotelCoin platform.",
  });

  const [hasSigned, setHasSigned] = useState(false); // State to track whether the user has signed
  const userWalletAddress = ""; // Replace with the user's wallet address

  // Check local storage to see if the user has signed
  useEffect(() => {
    const hasSignedLocally = localStorage.getItem("hasSigned");
    if (hasSignedLocally === "true") {
      setHasSigned(true);
    }
  }, []);

  // Handle the sign message action
  const handleSignMessage = async () => {
    if (isConnected && !isSuccess) {
      if (!hasSigned) {
        await signMessage();
        // Set the flag to indicate the user has signed
        localStorage.setItem("hasSigned", "true");
        setHasSigned(true);

        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            signedMessage: data, // The signed message
            userWalletAddress: userWalletAddress, // User's wallet address
          }),
        });

        if (response.status === 200) {
          // Registration was successful
          // Handle any additional logic, such as redirecting the user to their profile page.
        } else {
          // Registration failed, handle the error as needed.
        }
      }
    } else {
      open();
    }
  };

  return (
    <div>
      <button
        className={`bg-yellow-200 border-2 border-gray-900 dark:border-transparent hover:bg-yellow-100 dark:hover:bg-yellow-50 text-sm px-6 py-2 dark:bg-yellow-100 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 hover:text-gray-900 rounded-full font-semibold wallet-button`}
        disabled={isLoading}
        onClick={handleSignMessage}
      >
        {isConnected ? (isSuccess ? "My wallet" : "Log in") : "Connect Wallet"}
      </button>
    </div>
  );
}
