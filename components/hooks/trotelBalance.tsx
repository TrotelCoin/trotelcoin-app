import { useBalance } from "wagmi";
import getAccount from "./getAccount";
import React from "react";

interface BalanceData {
  data?: {
    formatted: string;
  };
  isError: boolean;
  isLoading: boolean;
}

export default function TrotelBalance() {
  const address = getAccount();

  try {
    const { data, isError, isLoading }: BalanceData = useBalance({
      address: address as `0x${string}`,
      token: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5",
    });

    if (isLoading) return <>0</>;
    if (isError) return <>0</>;

    let balance = data?.formatted ?? "0";

    return <>{parseFloat(balance).toFixed(0).toString()}</>;
  } catch (error) {
    console.log("An error occurred", error);
    return <span className="animate-pulse">0</span>;
  }
}
