import { Metadata } from 'next';
import './globals.css';

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
			<body className="font-mali">{children}</body>
		</html>
	);
}
