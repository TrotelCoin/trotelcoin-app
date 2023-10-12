import React, { useState, useEffect } from "react";
import Fade from "react-reveal";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";

const qs = require("qs");
const BigNumber = require("bignumber.js");
const web3 = require("web3");

interface Token {
  symbol: string; // Token symbol (e.g., "TROTEL")
  address: string; // Token address (e.g., "0xf04ab1a43cba1474160b7b8409387853d7be02d5")
}

const SwapInterface = () => {
  const [token1, setToken1] = useState<Token>({
    symbol: "USDC",
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  });
  const [token2, setToken2] = useState<Token>({
    symbol: "TROTEL",
    address: "0xf04ab1a43cba1474160b7b8409387853d7be02d5",
  });
  const [currentTrade, setCurrentTrade] = useState<{ from: Token; to: Token }>({
    from: token1,
    to: token2,
  });
  const [toAmountInput, setToAmountInput] = useState<number>(0); // State for toAmountInput
  const [gasEstimate, setGasEstimate] = useState<number>(0); // State for gasEstimate
  const [sellAmountInput, setSellAmountInput] = useState<string>("");
  const { address: takerAddress, isConnected } = useAccount();
  const [walletConnected, setWalletConnected] = useState(isConnected);
  const { connectAsync } = useConnect();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: "Log in on the TrotelCoin platform.",
  });

  useEffect(() => {
    const storedWalletAccount = localStorage.getItem("walletAccount");

    if (storedWalletAccount) {
      // If wallet connection information is found in local storage, mark the wallet as connected.
      setWalletConnected(true);
    }
  }, []);

  const handleExchangeToken = () => {
    // Swap the tokens
    setToken1(token2);
    setToken2(token1);
  };

  const getPrice = async () => {
    try {
      if (!currentTrade.from || !currentTrade.to || !sellAmountInput) return;

      // Replace placeholders with actual API key and endpoints
      const params = {
        sellToken: currentTrade.from.address,
        buyToken: currentTrade.to.address,
        // Calculate the amount based on user input
        sellAmount: parseInt(sellAmountInput),
      };

      const headers = {
        "0x-api-key": process.env.NEXT_PUBLIC_SWAP_API_KEY as string,
      };

      const response = await fetch(
        `https://bsc.api.0x.org/swap/v1/price?${qs.stringify(params)}`,
        { headers }
      );

      const swapPriceJSON = await response.json();

      console.log(swapPriceJSON);

      const updatedToAmount = parseFloat(swapPriceJSON.buyAmount);
      const updatedGasEstimate = parseFloat(swapPriceJSON.estimatedGas);

      // Update the state variables with the new values
      setToAmountInput(updatedToAmount);
      setGasEstimate(updatedGasEstimate);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  const getQuote = async (account: string) => {
    console.log("Getting Quote");

    if (!currentTrade.from || !currentTrade.to || !sellAmountInput) return;
    let amount = Number(parseInt(sellAmountInput));

    const params = {
      sellToken: currentTrade.from.address,
      buyToken: currentTrade.to.address,
      sellAmount: amount,
      // Set takerAddress to account
      takerAddress: account,
    };

    const headers = {
      "0x-api-key": process.env.NEXT_PUBLIC_SWAP_API_KEY as string,
    };

    const response = await fetch(
      `https://bsc.api.0x.org/swap/v1/quote?${qs.stringify(params)}`,
      { headers }
    );

    const swapQuoteJSON = await response.json();
    console.log("Quote: ", swapQuoteJSON);

    const updatedToAmount = parseFloat(swapQuoteJSON.buyAmount);
    const updatedGasEstimate = parseFloat(swapQuoteJSON.estimatedGas);

    // Update the state variables with the new values
    setToAmountInput(updatedToAmount);
    setGasEstimate(updatedGasEstimate);

    return swapQuoteJSON;
  };

  const { address } = useAccount();

  const trySwap = async (address: `0x${string}`) => {
    // Check if the account is connected
    const takerAddress = address;

    if (!address) {
      // If not connected, do not proceed with the swap
      alert("Please connect your wallet first.");
      return;
    }

    const erc20abi = [
      {
        inputs: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "uint256", name: "max_supply", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "burnFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    console.log("trying swap");

    console.log("takerAddress: ", takerAddress);

    const swapQuoteJSON = await getQuote(takerAddress);

    // Set Token Allowance
    // Set up approval amount
    const fromTokenAddress = currentTrade.from.address;
    const maxApproval = new BigNumber(2).pow(256).minus(1);
    console.log("approval amount: ", maxApproval);
    const ERC20TokenContract = new web3.eth.Contract(
      erc20abi,
      fromTokenAddress
    );
    console.log("setup ERC20TokenContract: ", ERC20TokenContract);

    // Grant the allowance target an allowance to spend our tokens.
    const tx = await ERC20TokenContract.methods
      .approve(swapQuoteJSON.allowanceTarget, maxApproval)
      .send({ from: takerAddress })
      .then((tx: string) => {
        console.log("tx: ", tx);
      });

    // Perform the swap
    const receipt = await web3.eth.sendTransaction(swapQuoteJSON);
    console.log("receipt: ", receipt);
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

  const handleAuth = async () => {
    const storedWalletAccount = localStorage.getItem("walletAccount");

    if (storedWalletAccount) {
      // If wallet information is found in local storage, skip the authentication process.
      setWalletConnected(true);
    } else {
      try {
        const { account, chain } = await connectAsync({
          connector: new InjectedConnector(),
        });

        // Store the wallet connection information
        localStorage.setItem("walletAccount", JSON.stringify(account));
        setWalletConnected(true);

        const signedMessage = await signMessage();
        localStorage.setItem("signedMessage", "true");

        console.log("Authenticated account:", account);
        console.log("Selected chain:", chain);
        console.log("Signed message:", signedMessage);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    }
  };

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
                    onChange={(e) => setSellAmountInput(e.target.value)}
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
                    value={toAmountInput}
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
            {walletConnected ? (
              <button
                className="text-sm px-6 py-2 bg-yellow-200 hover:bg-yellow-100 border-2 border-gray-900 dark:border-transparent dark:bg-yellow-100 dark:hover-bg-yellow-50 text-gray-900 dark:text-gray-900 font-semibold rounded-full leading-6"
                onClick={() => trySwap(takerAddress as `0x${string}`)}
              >
                Swap
              </button>
            ) : (
              <button
                className="text-sm px-6 py-2 bg-gray-300 text-gray-500 border-2 border-gray-500 dark:border-transparent cursor-pointer rounded-full leading-6"
                onClick={() => handleAuth()}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default SwapInterface;
