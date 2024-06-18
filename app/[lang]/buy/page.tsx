"use client";

import React from "react";

const Buy = () => {
  return (
    <>
      <div className="mx-auto max-w-md items-center justify-center">
        <div className="mx-auto flex justify-center rounded-xl">
          <iframe
            title="Buy"
            width="448"
            height="720"
            className="block max-w-md overflow-hidden rounded-xl border border-gray-900/10 bg-white dark:hidden dark:border-gray-100/10 dark:bg-gray-800"
            allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
            src="https://flooz.xyz/embed/trade?swapDisabled=false&swapNetwork=polygon&swapToTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapLockToToken=true&onRampDisabled=false&onRampNetwork=polygon&onRampAsDefault=true&onRampTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&onRampLockToken=true&network=eth&lightMode=true&backgroundColor=transparent"
          />
          <iframe
            title="Buy"
            width="448"
            height="720"
            className="hidden max-w-md overflow-hidden rounded-xl border border-gray-900/10 bg-white dark:block dark:border-gray-100/10 dark:bg-gray-800"
            allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
            src="https://flooz.xyz/embed/trade?swapDisabled=false&swapNetwork=polygon&swapToTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&swapLockToToken=true&onRampDisabled=false&onRampNetwork=polygon&onRampAsDefault=true&onRampTokenAddress=0x85057d5a8d063f9075Ba963101D76352051675E5&onRampLockToken=true&network=eth&lightMode=false&backgroundColor=transparent"
          />
        </div>
      </div>
    </>
  );
};

export default Buy;
