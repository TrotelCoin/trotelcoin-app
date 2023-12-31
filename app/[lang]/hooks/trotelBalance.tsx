"use client";

import { useBalance, useAccount } from "wagmi";
import React, { useEffect, useState } from "react";
import { polygon } from "wagmi/chains";
import { BalanceData } from "@/types/types";
import { trotelCoinAddress } from "@/data/addresses";

export default function TrotelBalance() {
  const [balance, setBalance] = useState("0");

  // Get the Ethereum address using the getAccount function
  const { address, isConnected } = useAccount();

  // Use the useBalance hook to fetch the balance data
  const { data, isError, isLoading }: BalanceData = useBalance({
    address: address as `0x${string}`, // Convert address to the correct format
    enabled: Boolean(address),
    token: trotelCoinAddress, // Token address for TrotelCoin (TROTEL)
    chainId: polygon.id,
    watch: true,
  });

  useEffect(() => {
    // If the data is still loading, return "0" within <></> (JSX fragment)
    if (isLoading) {
      setBalance("0");
    }

    // If there is an error, return "0" within <></> (JSX fragment)
    if (isError) {
      setBalance("0");
    }

    if (!isConnected) {
      setBalance("0");
    }
  }, [isLoading, isError, isConnected]);

  // Extract the balance value from the formatted data or default to "0"
  useEffect(() => {
    if (data?.formatted) {
      setBalance(data?.formatted);
    }
  }, [data]);

  // Parse the balance value to a whole number, format it as a string, and wrap it within <></> (JSX fragment)
  return <>{parseFloat(balance).toFixed(0)}</>;
}
