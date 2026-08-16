/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep your other valid configurations here...

  // Add this to resolve the Turbopack conflict:
  turbopack: {},

  // DELETE this block if you see it in your file:
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;