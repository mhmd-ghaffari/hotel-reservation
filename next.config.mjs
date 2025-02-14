/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nkucfeqhnsyycsscgskw.supabase.co",
        pathname: "/storage/v1/object/public/**", // این مسیر همه پوشه‌های Storage رو شامل میشه
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // output: "export", // این گزینه در صورت نیاز به Static Export استفاده میشه
};

export default nextConfig;
