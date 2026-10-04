/** @type {import('next').NextConfig} */
const nextConfig = process.env.STATIC_EXPORT
  ? { output: "export", images: { unoptimized: true } }
  : {};

export default nextConfig;
