/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ['page.js', 'api.js'],

  webpack(config, { isServer }) {
    // ✅ Import `svg` files as React components (unless `?url` is used)
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: '@svgr/webpack', options: { svgo: false } }],
    });

    // ✅ Import videos, models, hdrs, and fonts
    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: 'asset/resource',
    });

    // ✅ Force url import with `?url`
    config.module.rules.push({
      resourceQuery: /url/,
      type: 'asset/resource',
    });

    // ✅ Import `.glsl` shaders as source strings
    config.module.rules.push({
      test: /\.glsl$/,
      type: 'asset/source',
    });

    // ✅ Exclude server-only packages from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@sparticuz/chromium-min': false,
        'puppeteer-core': false,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
