import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:['192.168.10.169'],
images:{
  remotePatterns:[
        {
      protocol: "https",
      hostname: "logo.clearbit.com",
    },
  ]
}
};

export default nextConfig;
