"use client";

import { Lang } from "@/types/types";
import React, { useState, useEffect } from "react";
import Token from "@/app/[lang]/wallet/components/token";
import TokenAmount from "@/app/[lang]/wallet/components/tokenAmount";
import SendButton from "@/app/[lang]/wallet/components/sendButton";

const Send = ({ lang }: { lang: Lang }) => {
  const [token, setToken] = useState<string>("MATIC");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [amountError, setAmountError] = useState<string | null>(null);

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

  return (
    <>
      <div className="mt-4 w-full flex flex-col flex-wrap gap-4 bg-gray-100 border backdrop-blur-xl border-gray-900/20 dark:border-gray-100/20 rounded-lg py-4 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col flex-wrap gap-4 px-4">
          <span className="font-bold text-xl">
            {lang === "en" ? <>Send</> : <>Envoyer</>}
          </span>
          <div className="flex justify-between">
            <span>{lang === "en" ? "Balance" : "Solde"}</span>
            <div>
              <span className="font-semibold">{token ?? "TROTEL"}</span>
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
            <SendButton lang={lang} token={token} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Send;
