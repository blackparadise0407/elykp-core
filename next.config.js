/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
  },
};

module.exports = nextConfig;
