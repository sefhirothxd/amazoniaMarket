'use client';

import React from 'react';
import SiderbarIntra from '@/components/SiderbarIntra';
import { Inter } from 'next/font/google';
import HeaderIntra from '@/components/HeaderIntra';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface LayoutProps {
	children: React.ReactNode;
}

const inter = Inter({
	weight: ['400', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkSession = async () => {
			const { data: sessionData } = await supabase.auth.getSession();

			// Si no hay sesión, redirige al login
			if (!sessionData.session) {
				router.push('/login');
				return;
			}

			const userId = sessionData.session.user.id;

			// Consultamos al empleado para verificar su rol
			const { data: empleadoData, error } = await supabase
				.from('empleados')
				.select('rol')
				.eq('auth_user_id', userId)
				.single();

			if (error || !empleadoData) {
				console.error('Error obteniendo datos del empleado:', error);
				router.push('/login');
				return;
			}

			setLoading(false); // Usuario autorizado, mostrar el contenido
		};

		checkSession();
	}, [router]);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className={`flex gap-4 w-full  ${inter.className} bg-gray-100  `}>
			<SiderbarIntra />
			<main className="flex-1 flex flex-col gap-4 p-4 overflow-auto max-h-[calc(100vh)] rounded-lg shadow-md">
				<HeaderIntra />
				{children}
			</main>
		</div>
	);
};

export default Layout;
