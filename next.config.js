/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    i18n: {
        locales: ["ro", "en"],
        defaultLocale: "ro",
        localeDetection: false,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
