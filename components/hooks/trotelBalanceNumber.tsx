import { useBalance } from "wagmi";
import getAccount from "./getAccount";

// Define the shape of the data returned by useBalance hook
interface BalanceData {
  data?: {
    formatted: string;
  };
  isError: boolean;
  isLoading: boolean;
}

export default function TrotelBalanceNumber() {
  // Get the Ethereum address using the getAccount function
  const address = getAccount();

  try {
    // Use the useBalance hook to fetch the balance data
    const { data, isError, isLoading }: BalanceData = useBalance({
      address: address as `0x${string}`, // Convert address to the correct format
      token: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5", // Token address for TrotelCoin (TROTEL)
    });

    // If the data is still loading, return 0
    if (isLoading) return 0;

    // If there is an error, return 0
    if (isError) return 0;

    // Parse the balance value from the formatted data or default to 0
    let balance = parseFloat(data?.formatted ?? "0") || 0;

    return balance; // Return the parsed balance value
  } catch (error) {
    console.log("An error occurred", error); // Log any errors that occur
    return 0; // Return 0 in case of an error
  }
}
