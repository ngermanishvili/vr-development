/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Disable caching in development for faster development experience
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      staleTimes: {
        dynamic: 0,
        static: 0,
      },
    },
  }),

  // Disable static generation for faster development
  ...(process.env.NODE_ENV === 'development' && {
    trailingSlash: false,
    generateEtags: false,
  }),

  // Hot reload configuration
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev }) => {
      if (dev) {
        config.cache = false;
      }
      return config;
    },
  }),
};

export default nextConfig;
