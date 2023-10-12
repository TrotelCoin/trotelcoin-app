import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import Moralis from "moralis";
import { useAccount, useContractWrite } from "wagmi";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

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
  const { address, isConnected } = useAccount();
  const [showWarning, setShowWarning] = useState(false);

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    abi: [
      {
        inputs: [
          { internalType: "address", name: "_factory", type: "address" },
          { internalType: "address", name: "_WETH", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "WETH",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "tokenA", type: "address" },
          { internalType: "address", name: "tokenB", type: "address" },
          { internalType: "uint256", name: "amountADesired", type: "uint256" },
          { internalType: "uint256", name: "amountBDesired", type: "uint256" },
          { internalType: "uint256", name: "amountAMin", type: "uint256" },
          { internalType: "uint256", name: "amountBMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "addLiquidity",
        outputs: [
          { internalType: "uint256", name: "amountA", type: "uint256" },
          { internalType: "uint256", name: "amountB", type: "uint256" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          {
            internalType: "uint256",
            name: "amountTokenDesired",
            type: "uint256",
          },
          { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
          { internalType: "uint256", name: "amountETHMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "addLiquidityETH",
        outputs: [
          { internalType: "uint256", name: "amountToken", type: "uint256" },
          { internalType: "uint256", name: "amountETH", type: "uint256" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "factory",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "reserveIn", type: "uint256" },
          { internalType: "uint256", name: "reserveOut", type: "uint256" },
        ],
        name: "getAmountIn",
        outputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "reserveIn", type: "uint256" },
          { internalType: "uint256", name: "reserveOut", type: "uint256" },
        ],
        name: "getAmountOut",
        outputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
        ],
        name: "getAmountsIn",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
        ],
        name: "getAmountsOut",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountA", type: "uint256" },
          { internalType: "uint256", name: "reserveA", type: "uint256" },
          { internalType: "uint256", name: "reserveB", type: "uint256" },
        ],
        name: "quote",
        outputs: [
          { internalType: "uint256", name: "amountB", type: "uint256" },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "tokenA", type: "address" },
          { internalType: "address", name: "tokenB", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountAMin", type: "uint256" },
          { internalType: "uint256", name: "amountBMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "removeLiquidity",
        outputs: [
          { internalType: "uint256", name: "amountA", type: "uint256" },
          { internalType: "uint256", name: "amountB", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
          { internalType: "uint256", name: "amountETHMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "removeLiquidityETH",
        outputs: [
          { internalType: "uint256", name: "amountToken", type: "uint256" },
          { internalType: "uint256", name: "amountETH", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
          { internalType: "uint256", name: "amountETHMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "removeLiquidityETHSupportingFeeOnTransferTokens",
        outputs: [
          { internalType: "uint256", name: "amountETH", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
          { internalType: "uint256", name: "amountETHMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "bool", name: "approveMax", type: "bool" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "removeLiquidityETHWithPermit",
        outputs: [
          { internalType: "uint256", name: "amountToken", type: "uint256" },
          { internalType: "uint256", name: "amountETH", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountTokenMin", type: "uint256" },
          { internalType: "uint256", name: "amountETHMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "bool", name: "approveMax", type: "bool" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
        outputs: [
          { internalType: "uint256", name: "amountETH", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "tokenA", type: "address" },
          { internalType: "address", name: "tokenB", type: "address" },
          { internalType: "uint256", name: "liquidity", type: "uint256" },
          { internalType: "uint256", name: "amountAMin", type: "uint256" },
          { internalType: "uint256", name: "amountBMin", type: "uint256" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
          { internalType: "bool", name: "approveMax", type: "bool" },
          { internalType: "uint8", name: "v", type: "uint8" },
          { internalType: "bytes32", name: "r", type: "bytes32" },
          { internalType: "bytes32", name: "s", type: "bytes32" },
        ],
        name: "removeLiquidityWithPermit",
        outputs: [
          { internalType: "uint256", name: "amountA", type: "uint256" },
          { internalType: "uint256", name: "amountB", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapETHForExactTokens",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactETHForTokens",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForETH",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForTokens",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountIn", type: "uint256" },
          { internalType: "uint256", name: "amountOutMin", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMax", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapTokensForExactETH",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "amountOut", type: "uint256" },
          { internalType: "uint256", name: "amountInMax", type: "uint256" },
          { internalType: "address[]", name: "path", type: "address[]" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "deadline", type: "uint256" },
        ],
        name: "swapTokensForExactTokens",
        outputs: [
          { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      { stateMutability: "payable", type: "receive" },
    ],
    functionName: "swapETHForExactTokens",
  });

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

  const handleSwap = async () => {
    const amountOut = toAmountOutput;
    const path = [token1.address, token2.address];
    const to = address;
    const deadline = 123456789;

    if (isConnected) {
      const valueInWei = web3.utils.toWei(toAmountInput.toString(), "ether");

      const tx = write({
        args: [amountOut, path, to, deadline],
        value: valueInWei,
      });

      console.log("Transaction: ", tx);
    } else {
      setShowWarning(true);

      setTimeout(function () {
        setShowWarning(false);
      }, 2000);
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
                onClick={handleSwap}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </Fade>
      <Fade duration={100} left when={showWarning}>
        <div className="rounded-md absolute top-24 bg-yellow-50 p-4 flex justify-center mx-4 lg:mx-10 my-8 border-2 border-black dark:border-transparent">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-yellow-700"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <div className="text-sm text-yellow-700">
                {showWarning ? "Hide" : "Show"}
                <p>You need to connect your wallet to perform this action.</p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default SwapInterface;
