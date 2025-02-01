import { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Head from 'next/head';

export const metadata: Metadata = {
	title: 'Amazonia market',
	description: 'creado por skillien',
	icons: '/favicon.png',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<Head>
				<title>Mi Página</title>
				<meta name="description" content="Am" />

				{/* Open Graph / Facebook */}
				<meta property="og:title" content="Mi Página" />
				<meta property="og:description" content="Am" />
				<meta
					property="og:image"
					content="https://jzkbzghdxxqlugatkuqn.supabase.co/storage/v1/object/public/amazonia//ron"
				/>
				<meta property="og:url" content="https://tudominio.com/mi-pagina" />

				{/* Twitter */}
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="Mi Página" />
				<meta
					name="twitter:description"
					content="Esta es una descripción de mi página."
				/>
				<meta
					name="twitter:image"
					content="https://jzkbzghdxxqlugatkuqn.supabase.co/storage/v1/object/public/amazonia//ron"
				/>

				{/* WhatsApp y otras plataformas */}
				<meta property="og:image:width" content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:image:type" content="image/jpeg" />
			</Head>
			<body className="font-mali">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
