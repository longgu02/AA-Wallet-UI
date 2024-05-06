const path = require('path')
// import path from 'path'

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/wallet',
        permanent: true
      }
    ]
  },
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'icons.iconarchive.com',
        port: '',
        pathname: '/icons/**'
      }
    ]
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
