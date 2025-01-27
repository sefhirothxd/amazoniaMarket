'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

export default function Page({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkSession = async () => {
			const { data } = await supabase.auth.getSession();

			// Si no hay una sesión activa, redirige a la página de login
			if (!data.session) {
				router.push('/login');
			} else {
				setLoading(false); // Marca como cargado si el usuario está autenticado
			}
		};

		checkSession();
	}, [router]);

	// Mientras valida la sesión, muestra un estado de carga
	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>{children}</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}
