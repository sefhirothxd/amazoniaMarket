'use client';
import { icons } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
const SiderbarIntra = () => {
	const { empleado } = useEmpleadoStore();
	const router = useRouter();
	const linksAdmin = [
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
	const linksUser = [
		{
			name: 'Panel',
			url: '/intranet/panel',
			icons: icons.Activity,
		},
		{
			name: 'Empleado',
			url: '/intranet/empleado',
			icons: icons.User,
		},
		{
			name: 'Boleta',
			url: '/intranet/boleta',
			icons: icons.FileText,
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

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push('/');
	};

	return (
		<div className="flex flex-col justify-between gap-4 min-h-screen p-4 bg-gray-100  w-[100px] pt-[30px] lg:min-w-[350px]">
			<nav className="w-full">
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
				<ul className="flex-col flex justify-between items-start pl-[0px] lg:pl-[30px] gap-[10px]">
					{empleado?.rol === 'admin'
						? linksAdmin.map((link, index) => (
								<li key={index} className=" lg:w-[255px] text-[18px] w-full">
									<Link
										href={link.url}
										className={
											pathname == link.url
												? 'flex items-center space-x-2 gap-[12px] bg-black text-white pl-[18px]  lg:pl-[30px] py-[15px] rounded-full font-semibold '
												: 'flex items-center space-x-2 gap-[12px] hover:bg-black hover:text-white pl-[18px]   lg:pl-[30px] py-[15px] rounded-full font-semibold '
										}
									>
										{link.icons &&
											React.createElement(link.icons, { size: 24 })}
										<p className="hidden lg:block">{link.name}</p>
									</Link>
								</li>
						  ))
						: linksUser.map((link, index) => (
								<li key={index} className=" lg:w-[255px] text-[18px] w-full">
									<Link
										href={link.url}
										className={
											pathname == link.url
												? 'flex items-center space-x-2 gap-[12px] bg-black text-white pl-[18px]  lg:pl-[30px] py-[15px] rounded-full font-semibold '
												: 'flex items-center space-x-2 gap-[12px] hover:bg-black hover:text-white pl-[18px]   lg:pl-[30px] py-[15px] rounded-full font-semibold '
										}
									>
										{link.icons &&
											React.createElement(link.icons, { size: 24 })}
										<p className="hidden lg:block">{link.name}</p>
									</Link>
								</li>
						  ))}
				</ul>
			</nav>
			<button
				onClick={handleLogout}
				className="flex items-center justify-center gap-2 lg:w-[255px] lg:ml-[30px] p-4 text-white bg-red-500 rounded-full font-inter font-semibold"
			>
				<icons.LogOut size={24} />
				<p className="hidden lg:block">Cerrar sesión</p>
			</button>
		</div>
	);
};

export default SiderbarIntra;
