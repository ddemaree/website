/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");
const { withAxiom } = require("next-axiom");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/demaree/**",
      },
      {
        hostname: "pbs.twimg.com",
        port: "",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/feeds/posts.xml",
        destination: "/feed/rss",
        permanent: false,
      },
      {
        source: "/feeds/posts.json",
        destination: "/feed/json",
        permanent: false,
      },
      {
        source: "/p/:slug",
        destination: "/post/:slug",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/webfinger",
        destination: "/api/webfinger",
      },
      {
        source: "/feed",
        destination: "/feed/rss",
      },
    ];
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    config.experiments = { ...config.experiments, topLevelAwait: true };

    config.externals = [
      ...config.externals,
      "canvas",
      "jsdom",
      "shiki",
      // "bufferutil",
      // "utf-8-validate",
      // "encoding",
    ];

    return config;
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// if (process.env.NEXT_PUBLIC_AXIOM_INGEST_ENDPOINT) {
//   module.exports = withAxiom(
//     withSentryConfig(nextConfig, sentryWebpackPluginOptions)
//   );
// } else {
//   module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
// }
// module.exports = nextConfig;

// sentry: {
//   // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
//   // for client-side builds. (This will be the default starting in
//   // `@sentry/nextjs` version 8.0.0.) See
//   // https://webpack.js.org/configuration/devtool/ and
//   // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
//   // for more information.
//   hideSourceMaps: true,
// },

module.exports = withBundleAnalyzer(nextConfig);
