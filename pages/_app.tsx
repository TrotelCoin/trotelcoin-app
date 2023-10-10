// Import necessary modules and components
import { bsc } from "wagmi/chains";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";
import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import { NextPage } from "next";
import Hotjar from "@hotjar/browser";
import "../app/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";

// Initialize Hotjar for website analytics
const siteId = 3685770;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);

// Define supported blockchain chains and project ID
const chains = [bsc];
const projectId = "b0d3d1eb9c28fb7899eba1cff830b2b1";

// Define metadata for the website
const metadata = {
  name: "TrotelCoin",
  description: "Learn & earn crypto.",
  url: "https://app.trotelcoin.com",
  icons: ["https://i.ibb.co/SyF5HdQ/trotelcoin.png"],
};

// Configure Web3Modal with default settings
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create an instance of Web3Modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: "light",
  themeVariables: {
    "--w3m-font-family": "Poppins",
  },
});

// Define the main App component
const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const Router = useRouter();
  const [, setIsLoading] = useState(false);

  // Listen for route changes to display loading progress
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setIsLoading(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setIsLoading(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <>
      {/* Provide WagmiConfig and add a loading progress bar */}
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress
          height={3}
          color="#3b82f6"
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />
      </WagmiConfig>
    </>
  );
};

// Export the App component as the default export
export default App;
