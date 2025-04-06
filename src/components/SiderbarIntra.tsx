'use client';
import { icons } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
const SiderbarIntra = () => {
	const links = [
		{
			name: 'Panel',
			url: '/intranet/panel',
			icons: icons.Activity,
		},
		{
			name: 'Empleados',
			url: '/intranet/empleados',
			icons: icons.User,
		},
		{
			name: 'Boletas',
			url: '/intranet/boletas',
			icons: icons.FileText,
		},
		{
			name: 'Comunicado',
			url: '',
			icons: icons.MessageSquare,
		},
		{
			name: 'Tiendas',
			url: '',
			icons: icons.ShoppingBag,
		},
		{
			name: 'Movilidad',
			url: '',
			icons: icons.Truck,
		},
	];
	const pathname = usePathname();

	console.log(pathname);

	return (
		<div className="flex flex-col justify-between gap-4 min-h-screen p-4 bg-gray-100 min-w-[350px] pt-[50px]">
			<nav className="w-full ">
				<Link href="/">
					<picture className="flex justify-center">
						<Image
							src="/logo.svg"
							alt="logo amazonia"
							width={250}
							height={50}
							className="mb-[56px]"
						/>
					</picture>
				</Link>
				<ul className="flex-col flex justify-between items-start pl-[30px] gap-[20px]">
					{links.map((link, index) => (
						<li key={index} className=" w-[255px]">
							<Link
								href={link.url}
								className={
									pathname == link.url
										? 'flex items-center space-x-2 gap-[12px] bg-black text-white  pl-[30px] py-[20px] rounded-full font-semibold '
										: 'flex items-center space-x-2 gap-[12px] hover:bg-black hover:text-white  pl-[30px] py-[20px] rounded-full font-semibold '
								}
							>
								{link.icons && React.createElement(link.icons, { size: 24 })}
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<button className="flex items-center justify-center gap-2 w-[255px] ml-[30px] p-4 text-white bg-red-500 rounded-full font-inter font-semibold">
				<icons.LogOut size={24} />
				Cerrar sesión
			</button>
		</div>
	);
};

export default SiderbarIntra;
