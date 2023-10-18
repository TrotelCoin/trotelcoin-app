import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import Moralis from "moralis";
import { parseEther } from "viem";
import Success from "@/components/modals/success";
import Fail from "@/components/modals/fail";
import { bsc } from "wagmi/chains";
import { useAccount, useContractWrite } from "wagmi";
import v3RouterSwap from "@/components/abi/v3RouterSwap";
import trotelcoin from "@/components/abi/trotelcoin";
import TrotelBalance from "../hooks/trotelBalance";
import dynamic from "next/dynamic";

const web3 = require("web3");

interface Token {
  symbol: string; // Token symbol (e.g., "TROTEL")
  address: `0x${string}`; // Token address (e.g., "0xf04ab1a43cba1474160b7b8409387853d7be02d5")
}

const ApproxBalanceUSDNoSSR = dynamic(
  () => import("@/components/hooks/approxBalanceUSD"),
  {
    ssr: false,
  }
);

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
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [sendAmount, setSendAmount] = useState<number>(0);
  const [sendAddress, setSendAddress] = useState<`0x${string}`>();
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);
  const [amount, setAmount] = useState<boolean>(false);
  const [amountInput, setAmountInput] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [sentTrotel, setSentTrotel] = useState<boolean>(false);
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [bnbPrice, setBNBPrice] = useState<number | null>(null);
  const toAmountInputSanitized = isNaN(toAmountInput) ? 0.0 : toAmountInput;
  const toAmountOutputSanitized = isNaN(toAmountOutput) ? 0.0 : toAmountOutput;
  const sendAmountSanitized = isNaN(sendAmount) ? 0.0 : sendAmount;

  useEffect(() => {
    // Function to fetch token information from Moralis
    const fetchTokenInfo = async () => {
      try {
        // Check if Moralis is already started
        if (!Moralis.Core.isStarted) {
          // Initialize Moralis with the API key
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_VERCEL_ENV_MORALIS_API_KEY,
          });
        }

        // Fetch token price from Moralis EvmApi
        const response = await Moralis.EvmApi.token.getTokenPrice({
          chain: "0x38", // Binance Smart Chain
          include: "percent_change",
          address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5", // TrotelCoin (TROTEL) token address
        });

        // Set the token price in state
        setTokenPrice(response.raw.usdPrice);

        // Fetch token price from Moralis EvmApi
        const responseBNB = await Moralis.EvmApi.token.getTokenPrice({
          chain: "0x38", // Binance Smart Chain
          include: "percent_change",
          address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", // Wrapped BNB (WBNB) token address
        });

        // Set the token price in state
        setBNBPrice(responseBNB.raw.usdPrice);
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

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 1280); // in px
  };

  useEffect(() => {
    checkScreenSize(); // Initial check

    window.addEventListener("resize", checkScreenSize); // Add listener

    return () => {
      window.removeEventListener("resize", checkScreenSize); // Remove listener when unmounting
    };
  }, []);

  const {
    data: swapData,
    isLoading: swapLoading,
    isSuccess: swapSuccess,
    write: swap,
  } = useContractWrite({
    address: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4", // PancakeSwap V3 Router
    abi: v3RouterSwap,
    functionName: "exactInputSingle",
    chainId: bsc.id,
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
    chainId: bsc.id,
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
            apiKey: process.env.NEXT_PUBLIC_VERCEL_ENV_MORALIS_API_KEY,
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
      } catch (e) {
        console.error(e);
      }
    };

    // Call the fetchTokenInfo function when the component mounts
    fetchTokenInfo();
  }, []);

  useEffect(() => {
    setToAmountOutput(
      Math.floor(toAmountInputSanitized * (tokenPriceSwap as number))
    );
  }, [toAmountInput, tokenPriceSwap]);

  const handleSwap = async () => {
    try {
      if (!isConnected) {
        setConnect(true);
        return;
      }

      // Make sure you have the correct contract parameters
      const poolFee: number = 25; // 0.25% fee
      const amountIn = parseEther(toAmountInputSanitized.toString());
      const minAmountOutPercentage = 0.95; // 95% of the expected output
      const amountOutMin = parseEther(
        (toAmountOutputSanitized * minAmountOutPercentage).toString()
      );
      const sqrtPriceLimitX96: number = 0;

      if (!isApproved) {
        // Request token allowance if not approved
        approve({
          args: [token1.address],
        });
      }

      if (!toAmountInput) {
        setAmountInput(true);
      }

      // Call the swap function with the specified parameters
      swap({
        args: [
          [
            token1.address,
            token2.address,
            poolFee,
            takerAddress,
            amountIn,
            amountOutMin,
            sqrtPriceLimitX96,
          ],
        ],
      });
    } catch (error) {
      setError(true);
    }
  };

  const {
    data: approveTrotelData,
    isLoading: approveTrotelLoading,
    isSuccess: approveTrotelSuccess,
    write: approveTrotel,
  } = useContractWrite({
    address: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5",
    abi: trotelcoin,
    functionName: "approve",
    chainId: bsc.id,
  });

  const {
    data: transferTrotelData,
    isLoading: transferTrotelLoading,
    isSuccess: transferTrotelSuccess,
    write: transferTrotel,
  } = useContractWrite({
    address: "0xf04ab1a43cBA1474160B7B8409387853D7Be02d5",
    abi: trotelcoin,
    functionName: "transfer",
    chainId: bsc.id,
  });

  const handleSend = async () => {
    try {
      if (!isConnected) {
        setConnect(true);
        return;
      }

      if (!sendAddress) {
        setRecipient(true);
        return;
      }

      if (!sendAmount) {
        setAmount(true);
        return;
      }

      approveTrotel({
        args: [takerAddress, parseEther((sendAmount * 1.05).toString())],
      });

      // Call the swap function with the specified parameters
      transferTrotel({
        args: [sendAddress, parseEther(sendAmount.toString())],
      });

      if (transferTrotelSuccess) {
        setSentTrotel(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  const handleCopyAddress = () => {
    if (isConnected) {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = takerAddress as string;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);

      setAddressCopied(true);
    } else {
      setConnect(true);
    }
  };

  const closeSuccess = () => {
    setAddressCopied(false);
  };

  const closeConnect = () => {
    setConnect(false);
  };

  const closeRecipient = () => {
    setRecipient(false);
  };

  const closeAmount = () => {
    setAmount(false);
    setAmountInput(false);
  };

  const closeError = () => {
    setError(false);
  };

  const closeSentTrotel = () => {
    setSentTrotel(false);
  };

  const maxLength = 16;

  const truncateMiddleOfString = (input: string, maxLength: number): string => {
    if (input.length <= maxLength) {
      return input;
    } else if (maxLength <= 3) {
      return "…".repeat(maxLength);
    } else {
      const startLength = Math.floor((maxLength - 3) / 2);
      const endLength = Math.ceil((maxLength - 3) / 2);
      return (
        input.slice(0, startLength) +
        "…" +
        input.slice(input.length - endLength)
      );
    }
  };

  return (
    <>
      {addressCopied && (
        <Success
          title="Address copied"
          show={addressCopied}
          message="Address copied successfully!"
          onClose={closeSuccess}
        />
      )}
      {sentTrotel && (
        <Success
          title="TrotelCoin sent"
          show={sentTrotel}
          message={`You sent ${sendAmountSanitized} TrotelCoin to ${truncateMiddleOfString(
            sendAddress as string,
            maxLength
          )}!`}
          onClose={closeSentTrotel}
        />
      )}
      {amount && (
        <Fail
          title="No amount"
          show={amount}
          message="You need to enter the amount!"
          onClose={closeAmount}
        />
      )}
      {amountInput && (
        <Fail
          title="No amount"
          show={amountInput}
          message="You need to enter the amount!"
          onClose={closeAmount}
        />
      )}
      {recipient && (
        <Fail
          title="No recipient"
          show={recipient}
          message="You need to enter the recipient!"
          onClose={closeRecipient}
        />
      )}
      {connect && (
        <Fail
          title="No wallet"
          show={connect}
          message="You need to connect your wallet!"
          onClose={closeConnect}
        />
      )}
      {error && (
        <Fail
          title="Error"
          show={error}
          message="An error happened!"
          onClose={closeError}
        />
      )}
      <Fade>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-4 lg:mx-10 my-8 overflow-hidden">
          {/* Swap card */}
          <div className="bg-gray-50 border-2 border-gray-900/10 dark:border-gray-100/10 rounded-xl px-14 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h2 className="block text-xl text-center font-semibold leading-6 dark:text-gray-100 text-gray-900">
              Buy TrotelCoin
            </h2>

            {/* Token 1 */}
            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Sell {toAmountInputSanitized} {token1.symbol} worth $
                  {((bnbPrice as number) * toAmountInputSanitized).toFixed(2)}
                </span>
                <div className="relative rounded-md">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md py-1.5 text-gray-900 border-2 border-gray-900/10 dark:border-gray-100/10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      onChange={(e) =>
                        setToAmountInput(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Token 2 */}
            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Buy {toAmountOutputSanitized} {token2.symbol} worth $
                  {((tokenPrice as number) * toAmountOutputSanitized).toFixed(
                    2
                  )}
                </span>
                <div className="relative rounded-md">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md py-1.5 text-gray-900 border-2 border-gray-900/10 dark:border-gray-100/10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      value={`≈ ${toAmountOutputSanitized.toFixed(2)}`}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Swap button */}
            <div className="text-center">
              <button
                className="text-sm px-6 py-2 bg-yellow-200 dark:hover:bg-yellow-100/80 hover:bg-yellow-200/80 dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
                onClick={() => handleSwap()}
              >
                Swap
              </button>
            </div>
          </div>

          {/* Send card */}
          <div className="bg-gray-50 border-2 border-gray-900/10 dark:border-gray-100/10 rounded-xl px-14 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h2 className="block text-xl text-center font-semibold leading-6 dark:text-gray-100 text-gray-900">
              Send TrotelCoin
            </h2>

            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Amount worth $
                  {((tokenPrice as number) * sendAmountSanitized).toFixed(2)}
                </span>
                <div className="relative rounded-md">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md py-1.5 text-gray-900 border-2 border-gray-900/10 dark:border-gray-100/10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="0.00"
                      onChange={(e) =>
                        setSendAmount(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Recipient
                </span>
                <div className="relative rounded-md">
                  <div>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="block w-full rounded-md py-1.5 text-gray-900 border-2 border-gray-900/10 dark:border-gray-100/10 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      placeholder="0x..."
                      onChange={(e) =>
                        setSendAddress(e.target.value as `0x${string}`)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Send button */}
            <div className="text-center">
              <button
                className="text-sm px-6 py-2 bg-yellow-200 dark:hover:bg-yellow-100/80 hover:bg-yellow-200/80 dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
                onClick={() => handleSend()}
              >
                Send
              </button>
            </div>
          </div>

          {/* Receive card */}
          <div className="bg-gray-50 border-2 border-gray-900/10 dark:border-gray-100/10 rounded-xl px-14 py-10 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <h2 className="block text-xl text-center font-semibold leading-6 dark:text-gray-100 text-gray-900">
              Receive TrotelCoin
            </h2>

            <div className="mt-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Your address
                </span>
                {isSmallScreen ? (
                  <span className="text-center items-center overflow-hidden whitespace-no-wrap rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 border-2 border-gray-900/50 dark:border-gray-100/50">
                    {!isConnected
                      ? "Connect your wallet"
                      : truncateMiddleOfString(
                          takerAddress as string,
                          maxLength
                        )}
                  </span>
                ) : (
                  <span className="text-center items-center overflow-hidden whitespace-no-wrap rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 border-2 border-gray-900/50 dark:border-gray-100/50">
                    {!isConnected ? "Connect your wallet" : takerAddress}
                  </span>
                )}
              </div>
            </div>

            <div className="my-10 gap-y-6 flex flex-col">
              <div className="flex flex-col gap-y-2">
                <span className="text-md dark:text-gray-100 text-gray-900">
                  Balance
                </span>

                <span className="text-center items-center rounded-md bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600 border-2 border-gray-900/50 dark:border-gray-100/50 dark:ring-gray-900/10">
                  <TrotelBalance /> TrotelCoin worth $
                  <ApproxBalanceUSDNoSSR />
                </span>
              </div>
            </div>

            {/* Coppy button */}
            <div className="text-center">
              <button
                className="text-sm px-6 py-2 bg-yellow-200 dark:hover:bg-yellow-100/80 hover:bg-yellow-200/80 dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
                onClick={() => handleCopyAddress()}
              >
                Copy address
              </button>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default SwapInterface;
