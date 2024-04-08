const withMDX = require("@next/mdx")();

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production",
});

/** @type {import('next').NextConfig} */
module.exports = withMDX(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

    images: {
      domains: [
        "coingecko.com",
        "assets.coingecko.com",
        "cryptologos.cc",
        "raw.githubusercontent.com",
        "media.socket.tech",
        "arbiscan.io",
        "s2.coinmarketcap.com",
        "optimistic.etherscan.io",
        "gnosisscan.io",
        "bscscan.com",
        "tokens.1inch.io",
        "bridgelogos.s3.ap-south-1.amazonaws.com",
      ],
    },

    webpack(config) {
      config.resolve.fallback = {
        // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped.
        ...config.resolve.fallback,

        fs: false, // the solution
      };

      config.externals.push("pino-pretty", "lokijs", "encoding");

      return config;
    },

    logging: {
      fetches: {
        fullUrl: process.env.NODE_ENV !== "production",
      },
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/en/home",
          permanent: false,
        },
        {
          source: "/en",
          destination: "/en/home",
          permanent: false,
        },
        {
          source: "/fr",
          destination: "/fr/home",
          permanent: false,
        },
      ];
    },
  })
);
