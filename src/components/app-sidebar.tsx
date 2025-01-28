'use client';

import * as React from 'react';
import {
	Package,
	// SquareStack,
	// Box,
	// Settings2,
	Home,
	Moon,
	Sun,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const data = {
	user: {
		name: 'Admin',
		email: 'admin@example.com',
		avatar: '/chill.jpg',
		storeFullName: 'Amazonia Market',
		storeName: 'A',
	},
	navMain: [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: Home,
			isActive: true,
		},
		{
			title: 'Productos',
			url: '/dashboard/productos/agregar',
			icon: Package,
		},
		// {
		// 	title: 'Categorías',
		// 	url: '/dashboard/categorias',
		// 	icon: SquareStack,
		// },
		// {
		// 	title: 'Inventario',
		// 	url: '/dashboard/inventario',
		// 	icon: Box,
		// },
		// {
		// 	title: 'Configuración',
		// 	url: '/dashboard/configuracion',
		// 	icon: Settings2,
		// },
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const { theme, setTheme } = useTheme();

	const navItems = data.navMain.map((item) => ({
		...item,
		isActive: pathname === item.url,
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex items-center justify-between py-4 px-2 gap-2 flex-wrap">
					<h1 className="text-xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
						{data.user.storeFullName}
					</h1>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={navItems} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
