/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    prependData: `
          @import "@/styles/partials/variables";
          @import "@/styles/partials/mixins";
        `,
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
