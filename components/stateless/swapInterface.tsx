import React, { useState } from "react";
import Fade from "react-reveal";

const SwapInterface = () => {
  const [token1, setToken1] = useState("BNB");
  const [token2, setToken2] = useState("TROTEL");

  const handleExchangeToken = () => {
    // Swap the tokens
    setToken1(token2);
    setToken2(token1);
  };

  return (
    <Fade>
      <div className="flex justify-center mx-4 lg:mx-10 my-20 overflow-hidden">
        <div className="bg-gray-50 border-2 border-gray-900 dark:border-transparent text-center shadow rounded-xl px-20 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          {/* Token 1 */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 dark:text-gray-100 text-gray-900"
            >
              Buy / Sell TrotelCoin
            </label>
            <div className="relative mt-4 rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset dark:ring-gray-700 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm"
                  value={token1}
                  onChange={(e) => setToken1(e.target.value)}
                >
                  <option>{token1}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Exchange token */}
          <button className="my-4" onClick={() => handleExchangeToken()}>
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

          {/* Token 2 */}
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 dark:ring-gray-700 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm sm:leading-6"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:focus:ring-blue-400 sm:text-sm"
                  value={token2}
                  onChange={(e) => setToken2(e.target.value)}
                >
                  <option>{token2}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Swap button */}
          <button
            className="my-6 text-sm px-6 py-2 bg-yellow-200 hover:bg-yellow-100 border-2 border-gray-900 dark:border-transparent dark:bg-yellow-100 dark:hover:bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
            onClick={() => null}
          >
            Swap
          </button>
        </div>
      </div>
    </Fade>
  );
};

export default SwapInterface;
