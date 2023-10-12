import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import Moralis from "moralis";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useTransaction,
  useSendTransaction,
  usePrepareSendTransaction,
} from "wagmi";
import v3RouterSwap from "@/components/abi/v3RouterSwap";
import ISwapRouter from "@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json";

const web3 = require("web3");

interface Token {
  symbol: string; // Token symbol (e.g., "TROTEL")
  address: `0x${string}`; // Token address (e.g., "0xf04ab1a43cba1474160b7b8409387853d7be02d5")
}

const SwapInterface = () => {
  const [token1, setToken1] = useState<Token>({
    symbol: "WBNB",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  });
  const [token2, setToken2] = useState<Token>({
    symbol: "TROTEL",
    address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5",
  });
  const [toAmountInput, setToAmountInput] = useState<number>(0);
  const [toAmountOutput, setToAmountOutput] = useState<number>(0);
  const [tokenPriceSwap, setTokenPriceSwap] = useState<number | null>(null);
  const { address: takerAddress, isConnected } = useAccount();
  const [isApproved, setIsApproved] = useState(false);

  const {
    data: swapData,
    isLoading: swapLoading,
    isSuccess: swapSuccess,
    write: swap,
  } = useContractWrite({
    address: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4", // PancakeSwap V3 Router
    abi: v3RouterSwap,
    functionName: "exactInput",
  });

  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    write: approve,
  } = useContractWrite({
    address: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4", // PancakeSwap V3 Router
    abi: v3RouterSwap,
    functionName: "approveMax",
    onSuccess(data) {
      console.log("Success", data);
      setIsApproved(true);
      localStorage.setItem("isApproved", "true");
    },
  });

  useEffect(() => {
    const localApprovalStatus = localStorage.getItem("isApproved");
    if (localApprovalStatus === "true") {
      setIsApproved(true);
    }

    // Function to fetch token information from Moralis
    const fetchTokenInfo = async () => {
      try {
        // Check if Moralis is already started
        if (!Moralis.Core.isStarted) {
          // Initialize Moralis with the API key
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          });
        }

        // Fetch token price from Moralis EvmApi
        const response = await Moralis.EvmApi.token.getTokenPrice({
          chain: "0x38", // Binance Smart Chain
          address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
        });

        // Set the token price in state
        setTokenPriceSwap(
          (1 / parseFloat(response.raw.nativePrice?.value as string)) * 1e18
        );

        // Cache the token price in localStorage for future use
        localStorage.setItem(
          "tokenPriceSwap",
          String(
            (1 / parseFloat(response.raw.nativePrice?.value as string)) * 1e18
          )
        );
      } catch (e) {
        console.error(e);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();
  }, []);

  useEffect(() => {
    setToAmountOutput(Math.floor(toAmountInput * (tokenPriceSwap as number)));
  }, [toAmountInput, tokenPriceSwap]);

  const handleSwap = async () => {
    try {
      if (!isConnected) {
        alert("You need to connect your wallet to perform such action.");
        return;
      }

      // Make sure you have the correct contract parameters
      const fromToken = token1.address;
      const toToken = token2.address;
      const amountIn = toAmountInput * 1e18;
      const minAmountOutPercentage = 0.95; // 95% of the expected output
      const amountOutMin = toAmountOutput * minAmountOutPercentage * 1e18;
      const now = Math.floor(Date.now() / 1000); // Current Unix timestamp
      const tenMinutesInFuture = now + 600; // 600 seconds in 10 minutes
      const deadline = tenMinutesInFuture * 1e18;

      if (!isApproved) {
        // Request token allowance if not approved
        approve({
          args: [token1.address],
        });

        /* if (!isApproved) {
          alert("Token allowance is required for the swap.");
          return;
        } */
      }

      // Call the swap function with the specified parameters
      swap({
        args: [
          [
            [fromToken, toToken],
            takerAddress as `0x${string}`,
            deadline,
            amountIn,
            amountOutMin,
          ],
        ],
      });
    } catch (error) {
      console.error("Swap failed:", error);
    }
  };

  return (
    <>
      <Fade>
        <div className="flex justify-center mx-4 lg:mx-10 my-8 overflow-hidden">
          <div className="bg-gray-50 border-2 border-gray-900 dark:border-transparent shadow rounded-xl px-20 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h2 className="block text-xl text-center font-semibold leading-6 dark:text-gray-100 text-gray-900">
              Buy TrotelCoin
            </h2>

            {/* Token 1 */}
            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Sell {token1.symbol}
                </span>
                <div className="relative rounded-md shadow-sm">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset dark:ring-transparent ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 dark:focus:ring-transparent sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      onChange={(e) =>
                        setToAmountInput(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Exchange token */}
              <div className="mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>

              {/* Token 2 */}
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Buy {token2.symbol}
                </span>
                <div className="relative rounded-md shadow-sm">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:ring-transparent focus:ring-inset focus:ring-yellow-400 dark:focus:ring-transparent sm:text-sm sm:leading-6"
                      value={`≈ ${toAmountOutput.toFixed(2)}`}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Swap button */}
            <div className="text-center">
              <button
                className="text-sm px-6 py-2 bg-yellow-200 hover:bg-yellow-100 border-2 border-gray-900 dark:border-transparent dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
                onClick={() => handleSwap()}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default SwapInterface;
