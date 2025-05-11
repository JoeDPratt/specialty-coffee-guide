import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
    transpilePackages: ['@tanstack/react-query', '@tanstack/react-query-devtools', '@tanstack/query-core', 'zustand'],
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

    webpack(config, { dev, isServer }) {
        config.resolve = config.resolve || {};
        config.resolve.conditionNames = ['require', 'node'];
        // ↓ Only in dev on the client side, override webpack's file‐watcher options
        if (dev && !isServer) {
            config.watchOptions = {
                // turn off polling so chokidar will use native FSEvents
                poll: false,
                // ignore build output and deps
                ignored: ["**/.next/**", "**/node_modules/**"],
                // wait this many ms after change before recompile
                aggregateTimeout: 300,
            };
        }

        // --- your existing SVG loader logic ---
        const fileLoaderRule = config.module?.rules.find((rule: any) => {
            if (typeof rule === "string") return false;
            return rule.test instanceof RegExp && rule.test.test(".svg");
        }) as RuleSetRule | undefined;

        if (fileLoaderRule) {
            fileLoaderRule.exclude = /\.svg$/;
        }

        config.module?.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        } as RuleSetRule);

        return config;
    },
};

export default nextConfig;
