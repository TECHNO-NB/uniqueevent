import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{
    domains:['images.unsplash.com','localhost','backend.mithilatechsolutions.com']
  }
};

export default nextConfig;
