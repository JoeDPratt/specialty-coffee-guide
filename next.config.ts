import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
    images: {
        loader: "custom",
        deviceSizes: [420, 640, 768, 1024, 1280, 1920],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**",
            },
        ],
    },
    webpack(config) {
        // Find the default file loader rule that handles SVGs.
        const fileLoaderRule = config.module?.rules.find((rule: any) => {
            if (typeof rule === "string") return false;
            return rule.test instanceof RegExp && rule.test.test(".svg");
        }) as RuleSetRule | undefined;

        if (fileLoaderRule) {
            // Exclude SVG files from the default loader.
            fileLoaderRule.exclude = /\.svg$/;
        }

        // rule to handle SVGs using @svgr/webpack.
        config.module?.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        } as RuleSetRule);

        return config;
    },
};

export default nextConfig;
