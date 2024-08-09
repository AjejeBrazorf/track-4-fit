/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  webpack(config, context) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = nextConfig

