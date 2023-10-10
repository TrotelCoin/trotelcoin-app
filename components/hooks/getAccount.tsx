import { useAccount } from "wagmi";
import React from "react";

export default function GetAccount() {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (isConnecting) return <div>Connecting…</div>;
  if (isDisconnected) return <div>Disconnected</div>;

  return address;
}
