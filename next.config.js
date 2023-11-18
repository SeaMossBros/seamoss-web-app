const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()

const strapiUrl = new URL(process.env.NEXT_PUBLIC_CMS_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: strapiUrl.hostname,
        protocol: strapiUrl.protocol.split(':')[0],
      },
    ],
  },
}

module.exports = withVanillaExtract(nextConfig)
