"use client";

import { Lang } from "@/types/types";
import React, { useState, useEffect } from "react";
import Token from "@/app/[lang]/wallet/components/send/token";
import TokenAmount from "@/app/[lang]/wallet/components/send/tokenAmount";
import SendButton from "@/app/[lang]/wallet/components/send/sendButton";
import { useBalance, useEnsName } from "wagmi";
import { useAccount } from "wagmi";
import { Address, isAddress } from "viem";
import { mainnet, polygon } from "viem/chains";
import { trotelCoinAddress, usdcAddress } from "@/data/web3/addresses";
import ReceiverInput from "@/app/[lang]/wallet/components/send/receiverInput";
import Success from "@/app/[lang]/components/modals/success";
import shortenAddress from "@/utils/shortenAddress";
import Fail from "@/app/[lang]/components/modals/fail";

const SendAndReceive = ({
  lang,
  chainError,
  setChainError,
}: {
  lang: Lang;
  chainError: boolean;
  setChainError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
  const [ensName, setEnsName] = useState<string | null>(null);
  const [missingFieldsError, setMissingFieldsError] = useState<boolean>(false);
  const [handles, setHandles] = useState<string | null>(null);

  const { address}  = useAccount();

  const { data: ens } = useEnsName({
    address: address as Address,
    chainId: mainnet.id,
    enabled: Boolean(address),
  });

  useEffect(() => {
    if (ens) {
      setEnsName(ens);
    } else {
      setEnsName(null);
    }
  }, [ens]);

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
            ? "The address is not valid"
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
    } else {
      setAddressDisplay(null);
    }
  }, [address]);

  return (
    <>
      <div className="mt-8 w-full flex flex-col flex-wrap gap-4 divide-y divide-gray-900/10 dark:divide-gray-100/10 bg-gray-100 border backdrop-blur-xl border-gray-900/10 dark:border-gray-100/10 rounded-xl py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <span className="font-bold text-xl px-4">
          {lang === "en" ? <>Send</> : <>Envoyer</>}
        </span>
        <div className="pt-4 px-4 flex flex-col gap-4">
          <div className="flex justify-between">
            <span>{lang === "en" ? "Balance" : "Solde"}</span>
            <div>
              {parseFloat(balance?.toFixed(0) as string).toLocaleString(
                "en-US"
              ) ?? "0"}{" "}
              <span className="font-semibold">{token ?? "TROTEL"}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <span>{lang === "en" ? "Your address" : "Votre addresse"}</span>
            <span
              onClick={() => {
                if (address) {
                  navigator.clipboard.writeText(address);
                  setAddressCopied(true);
                }
              }}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-500 dark:hover:text-blue-300"
            >
              {ensName ??
                (addressDisplay
                  ? shortenAddress(addressDisplay)
                  : lang === "en"
                  ? "Not connected"
                  : "Non connecté")}{" "}
            </span>
          </div>
        </div>
        <div className="pt-4 px-4 flex flex-col gap-4">
          <Token lang={lang} token={token} setToken={setToken} />

          <TokenAmount
            lang={lang}
            amount={amount as number}
            setAmount={setAmount}
            amountError={amountError as string}
          />

          <ReceiverInput
            lang={lang}
            receiverAddress={receiverAddress as Address}
            setReceiverAddress={setReceiverAddress}
            receiverAddressError={receiverAddressError as string}
          />
        </div>
        <div className="pt-4 px-4">
          <SendButton
            lang={lang}
            token={token}
            balance={balance as number}
            amount={amount}
            receiverAddress={receiverAddress as Address}
            setMissingFieldsError={setMissingFieldsError}
            chainError={chainError}
            setChainError={setChainError}
          />
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
            : "Votre adresse a été copiée dans le presse-papiers"
        }
      />
      <Fail
        lang={lang}
        show={missingFieldsError}
        onClose={() => setMissingFieldsError(false)}
        title={lang === "en" ? "Missing fields" : "Champs manquants"}
        message={
          lang === "en"
            ? "Please fill in all the fields"
            : "Veuillez remplir tous les champs"
        }
      />
    </>
  );
};

export default SendAndReceive;
