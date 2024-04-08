import React from "react";
import Image from "next/image";

const TrotelCoinLogo = () => {
  return (
    <>
      <div className="block dark:hidden w-4 h-4">
        <Image
          width={16}
          height={16}
          className="rounded-full"
          aria-hidden="true"
          alt="Token logo"
          src={"/assets/logo/trotelcoin.svg"}
        />
      </div>
      <div className="hidden dark:block w-4 h-4">
        <Image
          width={16}
          height={16}
          className="rounded-full"
          aria-hidden="true"
          alt="Token logo"
          src={"/assets/logo/trotelcoin-dark.jpg"}
        />
      </div>
    </>
  );
};

export default TrotelCoinLogo;
