import { useBalance, useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { polygon } from "wagmi/chains";
import { BalanceData } from "@/types/types";

export default function TrotelBalance() {
  const [balance, setBalance] = useState("0");

  // Get the Ethereum address using the getAccount function
  const { address } = useAccount();

  // Use the useBalance hook to fetch the balance data
  const { data, isError, isLoading }: BalanceData = useBalance({
    address: address as `0x${string}`, // Convert address to the correct format
    token: "0x85057d5a8d063f9075Ba963101D76352051675E5", // Token address for TrotelCoin (TROTEL)
    chainId: polygon.id,
    watch: true,
    enabled: true,
  });

  // If the data is still loading, return "0" within <></> (JSX fragment)
  if (isLoading) {
    setBalance("0");
  }

  // If there is an error, return "0" within <></> (JSX fragment)
  if (isError) {
    setBalance("0");
  }

  // Extract the balance value from the formatted data or default to "0"
  useEffect(() => {
    if (data?.formatted) setBalance(data?.formatted);
  }, [data]);

  // Parse the balance value to a whole number, format it as a string, and wrap it within <></> (JSX fragment)
  return <>{parseFloat(balance).toFixed(0)}</>;
}
