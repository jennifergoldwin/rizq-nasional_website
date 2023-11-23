/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const nextConfig = {
    output: 'standalone',
    images: {
        unoptimized: true
    },
    trailingSlash: true
}

// module.exports = nextConfig

module.exports = withNextIntl({
   nextConfig
  });
