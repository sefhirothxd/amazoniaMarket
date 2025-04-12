'use client';

// import { AppSidebar } from '@/components/app-sidebar';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Page({ children }: { children: React.ReactNode }) {
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

			// Si no es admin, redirigimos a intranet
			if (empleadoData.rol !== 'admin') {
				router.push('/intranet');
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
		<ThemeProvider
			attribute="class"
			defaultTheme="default"
			enableSystem
			disableTransitionOnChange
		>
			<SidebarProvider>
				{/* <AppSidebar /> */}

				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}
