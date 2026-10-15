/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mppx'],
  async redirects() {
    return [
      {
        source: '/handbook',
        destination: '/residential-proxy-handbook',
        permanent: true,
      },
      {
        source: '/residential-proxy-pool-handbook',
        destination: '/residential-proxy-handbook',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
