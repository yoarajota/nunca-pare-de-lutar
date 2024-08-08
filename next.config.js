/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pt",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
