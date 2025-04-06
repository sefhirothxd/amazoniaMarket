import React from 'react';
import SiderbarIntra from '@/components/SiderbarIntra';
import { Inter } from 'next/font/google';
import HeaderIntra from '@/components/HeaderIntra';

interface LayoutProps {
	children: React.ReactNode;
}

const inter = Inter({ weight: ['400', '700'], style: ['normal', 'italic'] });

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className={`flex gap-4 w-full  ${inter.className} `}>
			<SiderbarIntra />
			<main className="flex-1 flex flex-col gap-4 p-4">
				<HeaderIntra />
				{children}
			</main>
		</div>
	);
};

export default Layout;
