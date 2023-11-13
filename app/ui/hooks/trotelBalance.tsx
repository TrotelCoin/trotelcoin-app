import { useBalance, useAccount } from "wagmi";
import React from "react";
import { polygon } from "wagmi/chains";
import { BalanceData } from "@/types/types";

export default function TrotelBalance() {
  // Get the Ethereum address using the getAccount function
  const { address } = useAccount();

  try {
    // Use the useBalance hook to fetch the balance data
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isError, isLoading }: BalanceData = useBalance({
      address: address as `0x${string}`, // Convert address to the correct format
      token: "0x2275059f310e31c2f43b24a9932882196659e1c4", // Token address for TrotelCoin (TROTEL)
      chainId: polygon.id,
      watch: true,
      enabled: true,
    });

    // If the data is still loading, return "0" within <></> (JSX fragment)
    if (isLoading) return <span className="animate-pulse">0</span>;

    // If there is an error, return "0" within <></> (JSX fragment)
    if (isError) return <span className="animate-pulse">0</span>;

    // Extract the balance value from the formatted data or default to "0"
    let balance = (data?.formatted as string) ?? "0";

    // Parse the balance value to a whole number, format it as a string, and wrap it within <></> (JSX fragment)
    return <>{parseFloat(balance).toFixed(0)}</>;
  } catch (error) {
    console.log("An error occurred", error); // Log any errors that occur
    return <span className="animate-pulse">0</span>; // Return "0" with a CSS animation (pulse)
  }
}
