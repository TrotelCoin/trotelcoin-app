const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
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
});
