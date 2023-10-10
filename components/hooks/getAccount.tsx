import { useAccount } from "wagmi";
import React from "react";

// Define a component named GetAccount
export default function GetAccount() {
  // Use the useAccount hook to get the Ethereum account information
  const { address, isConnecting, isDisconnected } = useAccount();

  // If the app is currently connecting to an Ethereum wallet, display "Connecting..."
  if (isConnecting) return <div>Connecting…</div>;

  // If the app is disconnected from the Ethereum network, display "Disconnected"
  if (isDisconnected) return <div>Disconnected</div>;

  // If the account information is available, return the Ethereum address
  return address;
}
