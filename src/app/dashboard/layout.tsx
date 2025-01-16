'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function Page({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push('/login');
	};
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<Button onClick={handleLogout}>Logout</Button>
					{children}
				</SidebarInset>
			</SidebarProvider>
		</ThemeProvider>
	);
}
