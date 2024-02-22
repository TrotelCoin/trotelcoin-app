"use client";

import { Lang } from "@/types/types";
import React, { useState, useEffect } from "react";
import Token from "@/app/[lang]/wallet/components/token";
import TokenAmount from "@/app/[lang]/wallet/components/tokenAmount";
import SendButton from "@/app/[lang]/wallet/components/sendButton";
import { useBalance } from "wagmi";
import { useAddress } from "@thirdweb-dev/react";
import { Address, isAddress } from "viem";
import { polygon } from "viem/chains";
import { trotelCoinAddress, usdcAddress } from "@/data/web3/addresses";
import ReceiverInput from "@/app/[lang]/wallet/components/receiverInput";
import Success from "@/app/[lang]/components/success";
import shortenAddress from "@/utils/shortenAddress";

const SendAndReceive = ({ lang }: { lang: Lang }) => {
  const [token, setToken] = useState<string>("MATIC");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [maticBalance, setMaticBalance] = useState<number | null>(null);
  const [trotelBalance, setTrotelBalance] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [receiverAddressError, setReceiverAddressError] = useState<
    string | null
  >(null);
  const [addressCopied, setAddressCopied] = useState<boolean>(false);
  const [addressDisplay, setAddressDisplay] = useState<Address | null>(null);

  const address = useAddress();

  const { data: matic } = useBalance({
    address: address as Address,
    chainId: polygon.id,
  });

  const { data: trotel } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: trotelCoinAddress,
  });

  const { data: usdc } = useBalance({
    address: address as Address,
    chainId: polygon.id,
    token: usdcAddress,
  });

  useEffect(() => {
    if (matic) {
      const balance = parseFloat(matic.formatted);
      setMaticBalance(balance);
    } else {
      setMaticBalance(0);
    }
  }, [maticBalance, matic]);

  useEffect(() => {
    if (trotel) {
      const balance = parseFloat(trotel.formatted);
      setTrotelBalance(balance);
    } else {
      setTrotelBalance(0);
    }
  }, [trotelBalance, trotel]);

  useEffect(() => {
    if (usdc) {
      const balance = parseFloat(usdc.formatted);
      setUsdcBalance(balance);
    } else {
      setUsdcBalance(0);
    }
  }, [usdcBalance, usdc]);

  useEffect(() => {
    if (amount) {
      if (amount < 0) {
        setAmountError(
          lang === "en"
            ? "The amount must be positive"
            : "Le montant doit être positif"
        );
      } else if (!Number(amount)) {
        setAmountError(
          lang === "en"
            ? "The amount must be a number"
            : "Le montant doit être un nombre"
        );
      } else {
        setAmountError(null);
      }
    }
  }, [amount]);

  useEffect(() => {
    if (receiverAddress) {
      if (!isAddress(receiverAddress)) {
        setReceiverAddressError(
          lang === "en"
            ? "The addressis not valid"
            : "L'adresse n'est pas valide"
        );
      } else {
        setReceiverAddressError(null);
      }
    }
  }, [receiverAddress]);

  useEffect(() => {
    if (token === "MATIC") {
      setBalance(maticBalance);
    } else if (token === "TROTEL") {
      setBalance(trotelBalance);
    } else if (token === "USDC") {
      setBalance(usdcBalance);
    } else {
      setBalance(0);
    }
  }, [token, maticBalance, trotelBalance, usdcBalance]);

  useEffect(() => {
    if (address) {
      setAddressDisplay(address as Address);
    }
  }, [address]);

  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col flex-wrap gap-4 px-4">
          <span className="font-bold text-xl">
            {lang === "en" ? <>Send & Receive</> : <>Envoyer & Recevoir</>}
          </span>
          <div className="flex justify-between">
            <span>{lang === "en" ? "Balance" : "Solde"}</span>
            <div>
              {balance?.toFixed(2) ?? 0}{" "}
              <span className="font-semibold">{token ?? "TROTEL"}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>{lang === "en" ? "Your address" : "Ton addresse"}</span>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  setAddressCopied(true);
                }
              }}
            >
              {addressDisplay
                ? shortenAddress(addressDisplay as Address)
                : lang === "en"
                ? "Not connected"
                : "Non connecté"}{" "}
            </div>
          </div>
          <div>
            <Token lang={lang} token={token} setToken={setToken} />
          </div>
          <div>
            <TokenAmount
              lang={lang}
              amount={amount as number}
              setAmount={setAmount}
              amountError={amountError as string}
            />
          </div>
          <div>
            <ReceiverInput
              lang={lang}
              receiverAddress={receiverAddress as Address}
              setReceiverAddress={setReceiverAddress}
              receiverAddressError={receiverAddressError as string}
            />
          </div>
          <div>
            <SendButton
              lang={lang}
              token={token}
              balance={balance as number}
              amount={amount as number}
              receiverAddress={receiverAddress as Address}
            />
          </div>
        </div>
      </div>
      <Success
        lang={lang}
        show={addressCopied}
        onClose={() => setAddressCopied(false)}
        title={lang === "en" ? "Address copied" : "Adresse copiée"}
        message={
          lang === "en"
            ? "Your address has been copied to the clipboard"
            : "Ton adresse a été copiée dans le presse-papiers"
        }
      />
    </>
  );
};

export default SendAndReceive;
