/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  // webpack5: true,
  images: {
    domains: ["innovokitchen.com"],
  },
  // async rewrites() {
  //     return [
  //     {
  //         source: "/api/:path*",
  //         destination: "https://api.spacexdata.com/v4/:path*", // Proxy to Backend
  //     },
  //     ];
  // },
  // async headers() {
  //     return [
  //     {
  //         source: "/(.*)",
  //         headers: securityHeaders,
  //     },
  //     ];
  // },
};

export default nextConfig;
