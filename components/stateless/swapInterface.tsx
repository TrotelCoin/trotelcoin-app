import React, { useState, useEffect } from "react";
import Fade from "react-reveal";

const qs = require("qs");

interface Token {
  symbol: string; // Token symbol (e.g., "BNB")
  address: string; // Token address (e.g., "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c")
}

const SwapInterface = () => {
  const [token1, setToken1] = useState<Token>({
    symbol: "BNB",
    address: "BNB",
  });
  const [token2, setToken2] = useState<Token>({
    symbol: "TROTEL",
    address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5",
  });
  const [currentTrade, setCurrentTrade] = useState<{ from: Token; to: Token }>({
    from: token1,
    to: token2,
  });
  const [toAmountInput, setToAmountInput] = useState(0); // State for toAmountInput
  const [gasEstimate, setGasEstimate] = useState(0); // State for gasEstimate
  const [sellAmountInput, setSellAmountInput] = useState(0);

  const handleExchangeToken = () => {
    // Swap the tokens
    setToken1(token2);
    setToken2(token1);
  };

  const getPrice = async () => {
    try {
      if (!currentTrade.from || !currentTrade.to) return;

      // Replace placeholders with actual API key and endpoints
      const params = {
        sellToken: currentTrade.from.address,
        buyToken: currentTrade.to.address,
        // Calculate the amount based on user input
        sellAmount: sellAmountInput,
      };

      const headers = {
        "0x-api-key": process.env.NEXT_PUBLIC_SWAP_API_KEY as string,
      };

      const response = await fetch(
        `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`,
        { headers }
      );

      console.log("SWAP_API_KEY:", process.env.NEXT_PUBLIC_SWAP_API_KEY);

      const swapPriceJSON = await response.json();

      console.log(swapPriceJSON);

      const updatedToAmount = parseFloat(swapPriceJSON.buyAmount) / 10 ** 18; // Assuming decimals is 18, need to change it accordingly
      const updatedGasEstimate = parseFloat(swapPriceJSON.estimatedGas);

      // Update the state variables with the new values
      setToAmountInput(updatedToAmount);
      setGasEstimate(updatedGasEstimate);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  useEffect(() => {
    // Update the currentTrade state based on the selected tokens
    setCurrentTrade({
      from: token1,
      to: token2,
    });

    // Call getPrice every time sellAmountInput changes
    getPrice();
  }, [token1, token2, sellAmountInput]);

  return (
    <Fade>
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        <div className="bg-gray-50 border-2 border-gray-900 dark:border-transparent shadow rounded-xl px-20 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h2 className="block text-xl text-center font-semibold leading-6 dark:text-gray-100 text-gray-900">
            Swap TrotelCoin
          </h2>

          {/* Token 1 */}
          <div className="my-10 gap-y-6 flex flex-col">
            <div className="flex flex-col gap-y-2">
              <span className="text-md dark:text-gray-100 text-gray-900">
                Sell
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
                      setSellAmountInput(parseFloat(e.target.value))
                    }
                  />

                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="currency"
                      name="currency"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm"
                      value={token1.symbol}
                      onChange={(e) =>
                        setToken1({
                          symbol: e.target.value,
                          address: token2.address,
                        })
                      }
                    >
                      <option>{token1.symbol}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange token */}
            <div className="text-center -mb-4">
              <button onClick={() => handleExchangeToken()}>
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
                    d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                  />
                </svg>
              </button>
            </div>

            {/* Token 2 */}
            <div className="flex flex-col gap-y-2">
              <span className="text-md dark:text-gray-100 text-gray-900">
                Buy
              </span>
              <div className="relative rounded-md shadow-sm">
                <div>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:ring-transparent focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6"
                    placeholder={toAmountInput.toFixed(2)}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <select
                      id="currency"
                      name="currency"
                      className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm"
                      value={token2.symbol}
                      onChange={(e) =>
                        setToken2({
                          symbol: e.target.value,
                          address: token1.address,
                        })
                      }
                    >
                      <option>{token2.symbol}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swap button */}
          <div className="text-center">
            <button
              className="text-sm px-6 py-2 bg-yellow-200 hover:bg-yellow-100 border-2 border-gray-900 dark:border-transparent dark:bg-yellow-100 dark:hover:bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
              onClick={() => null}
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
