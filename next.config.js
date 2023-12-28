const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en/home",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
