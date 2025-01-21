import { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
	title: 'Amazonia market',
	description: 'creado por skillien',
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
