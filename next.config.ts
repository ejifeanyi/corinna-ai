import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "wordpress-1369152-5046771.cloudwaysapps.com",
			},
		],
	},
};

export default nextConfig;
