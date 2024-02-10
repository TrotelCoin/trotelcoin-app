const nextConfig = {
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
};

module.exports = nextConfig;
