import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import Moralis from "moralis";

const qs = require("qs");
const BigNumber = require("bignumber.js");
const web3 = require("web3");

interface Token {
  symbol: string; // Token symbol (e.g., "TROTEL")
  address: string; // Token address (e.g., "0xf04ab1a43cba1474160b7b8409387853d7be02d5")
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

  useEffect(() => {
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

        // Check if the token price is already cached in localStorage
        const cachedTokenPriceSwap = localStorage.getItem("tokenPriceSwap");

        if (cachedTokenPriceSwap) {
          // Use the cached token price
          setTokenPriceSwap(parseFloat(cachedTokenPriceSwap));
        } else {
          // Fetch token price from Moralis EvmApi
          const response = await Moralis.EvmApi.token.getTokenPrice({
            chain: "0x38", // Binance Smart Chain
            address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
          });

          // Set the token price in state
          setTokenPriceSwap(
            parseFloat(response.raw.nativePrice?.value as string) / 1e18
          );

          // Cache the token price in localStorage for future use
          localStorage.setItem(
            "tokenPriceSwap",
            String(parseFloat(response.raw.nativePrice?.value as string) / 1e18)
          );
        }
      } catch (e) {
        console.error(e);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();

    // Set up a timer to fetch and update the token price periodically
    const refreshInterval = setInterval(fetchTokenInfo, 300000); // Every 5 minutes

    // Clear the timer when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  console.log("1 WBNB =", tokenPriceSwap, "TROTEL");

  useEffect(() => {
    setToAmountOutput(toAmountInput * (tokenPriceSwap as number));
  }, [toAmountInput, tokenPriceSwap]);

  return (
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
                    className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset dark:ring-transparent ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
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
                    className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:ring-transparent focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                    placeholder={`≈ ${toAmountOutput.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Swap button */}
          <div className="text-center">
            <button
              className="text-sm px-6 py-2 bg-yellow-200 hover:bg-yellow-100 border-2 border-gray-900 dark:border-transparent dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
              onClick={() => {}}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default SwapInterface;
