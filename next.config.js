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
