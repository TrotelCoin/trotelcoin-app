import React from "react";
import Image from "next/image";

const TrotelCoinLogo = ({
  width,
  height
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <>
      <div className="block w-full dark:hidden">
        <Image
          width={width ?? 16}
          height={height ?? 16}
          className="rounded-full"
          aria-hidden="true"
          alt="Token logo"
          src={"/assets/logo/trotelcoin.svg"}
        />
      </div>
      <div className="hidden w-full dark:block">
        <Image
          width={width ?? 16}
          height={height ?? 16}
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
