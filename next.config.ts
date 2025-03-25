import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  webpack(config) {
    // Find the default file loader rule that handles SVGs.
    const fileLoaderRule = config.module?.rules.find((rule) => {
      if (typeof rule === "string") return false;
      return rule.test instanceof RegExp && rule.test.test(".svg");
    }) as RuleSetRule | undefined;

    if (fileLoaderRule) {
      // Exclude SVG files from the default loader.
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add a new rule to handle SVGs using @svgr/webpack.
    config.module?.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    } as RuleSetRule);

    return config;
  },
};

export default nextConfig;
