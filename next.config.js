const withMDX = require("@next/mdx")();

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production"
});

/** @type {import('next').NextConfig} */
module.exports = withMDX(
  withPWA({
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "coingecko.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "assets.coingecko.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "cryptologos.cc",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "media.socket.tech",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "arbiscan.io",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "s2.coinmarketcap.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "optimistic.etherscan.io",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "gnosisscan.io",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "bscscan.com",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "tokens.1inch.io",
          port: "",
          pathname: "/**"
        },
        {
          protocol: "https",
          hostname: "bridgelogos.s3.ap-south-1.amazonaws.com",
          port: "",
          pathname: "/**"
        }
      ]
    },

    webpack(config) {
      config.resolve.fallback = {
        // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped.
        ...config.resolve.fallback,

        fs: false // the solution
      };

      config.externals.push("pino-pretty", "lokijs", "encoding");

      return config;
    },

    logging: {
      fetches: {
        fullUrl: process.env.NODE_ENV !== "production"
      }
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/en/home",
          permanent: false
        },
        {
          source: "/en",
          destination: "/en/home",
          permanent: false
        },
        {
          source: "/fr",
          destination: "/fr/home",
          permanent: false
        }
      ];
    }
  })
);
