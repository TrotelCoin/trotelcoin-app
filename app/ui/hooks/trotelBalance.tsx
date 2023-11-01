import { useBalance, useAccount } from "wagmi";
import React from "react";
import { bsc } from "wagmi/chains";
import { BalanceData } from "@/types/types";

export default function TrotelBalance() {
  // Get the Ethereum address using the getAccount function
  const { address } = useAccount();

  try {
    // Use the useBalance hook to fetch the balance data
    const { data, isError, isLoading }: BalanceData = useBalance({
      address: address as `0x${string}`, // Convert address to the correct format
      token: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5", // Token address for TrotelCoin (TROTEL)
      chainId: bsc.id,
    });

    // If the data is still loading, return "0" within <></> (JSX fragment)
    if (isLoading) return <>0</>;

    // If there is an error, return "0" within <></> (JSX fragment)
    if (isError) return <>0</>;

    // Extract the balance value from the formatted data or default to "0"
    let balance = (data?.formatted as string) ?? "0";

    // Parse the balance value to a whole number, format it as a string, and wrap it within <></> (JSX fragment)
    return <>{parseFloat(balance).toFixed(0).toString()}</>;
  } catch (error) {
    console.log("An error occurred", error); // Log any errors that occur
    return <span className="animate-pulse">0</span>; // Return "0" with a CSS animation (pulse)
  }
}
