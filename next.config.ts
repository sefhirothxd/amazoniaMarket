import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		domains: ['jzkbzghdxxqlugatkuqn.supabase.co'], // Agrega aquí el dominio
	},
	devIndicators: {
		appIsrStatus: false,
	},
};

export default nextConfig;
