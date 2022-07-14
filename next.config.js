/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ['assets.pokemon.com', 'raw.githubusercontent.com']
  }
}

module.exports = nextConfig
