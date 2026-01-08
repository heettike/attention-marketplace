import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/docs',
        destination: 'https://noice-docs.mintlify.app',
        permanent: false,
      },
      {
        source: '/docs/:path*',
        destination: 'https://noice-docs.mintlify.app/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
