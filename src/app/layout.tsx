import { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: 'Amazonia market',
	description:
		'En AmazoniaMarket.pe, encuentra los mejores productos regionales y nacionales de Perú en nuestros minimarkets ubicados en aeropuertos. Descubre snacks, bebidas y artesanías típicas que reflejan la diversidad cultural del país. ¡Haz de tu viaje una experiencia auténtica!',
	icons: '/favicon.png',
	metadataBase: new URL('https://amazoniamarket.pe/'),
	keywords: [
		'Productos regionales Perú',
		'Minimarket en aeropuertos Perú',
		'Compras en aeropuertos Perú',
		'Productos típicos peruanos',
		'Snacks peruanos',
		'Artesanías peruanas',
		'Bebidas tradicionales Perú',
		'Tienda en aeropuertos Perú',
		'AmazoniaMarket Perú',
		'Productos nacionales Perú',
		'Regalos típicos peruanos',
		'Experiencia de compra en aeropuertos',
		'Productos auténticos de Perú',
		'Tienda de conveniencia en aeropuertos',
		'Compras rápidas en aeropuertos',
	],
	authors: [
		{ name: 'Bryan Vera', url: 'https://bryanvera.dev/' },
		{ name: 'Anthony Ureta', url: 'https://skillien.com/' },
	],
	creator: 'Skillien team',
	publisher: 'Skillien.com',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		images: '/bannerMovil.png',
	},
	other: {
		'google-site-verification': 'l9Uc5fHb39BG8RHgTf3X43Q6IhbJmZfM6XwLnonaNW4',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-mali">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
