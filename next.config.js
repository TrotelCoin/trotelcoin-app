const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: false,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
