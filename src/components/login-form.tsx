'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import Image from 'next/image';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.log('🚀 ~ handleLogin ~ error:', error);
			toast({
				title: 'Error',
				description: error.message,
				action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
			});
		} else {
			router.push('/dashboard');
		}
		setLoading(false);
	};

	useEffect(() => {
		const checkSession = async () => {
			const { data } = await supabase.auth.getSession();

			// Si no hay una sesión activa, redirige a la página de login
			if (data.session) {
				router.push('/dashboard');
			}
		};

		checkSession();
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-start w-full bg-white">
			<div className="bg-white p-8 rounded-lg w-full max-w-[500px] flex flex-col justify-between h-screen">
				<div></div>
				<form onSubmit={handleLogin} className="space-y-6">
					<h1 className="text-[35px] font-bold  mb-[55px] text-black ">
						Visítanos y compra tus productos favoritos
					</h1>
					<div>
						<input
							placeholder="Correo electrónico"
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<input
							placeholder="Contraseña"
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="mt-1 block w-full px-3 py-2 border bg-gray-100 text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[15px] shadow-sm text-[28px] font-medium text-white bg-[#EA0029] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						{loading ? 'Cargando...' : 'Acceder'}
					</button>
					<div className="text-center">
						<a
							href="#"
							className="text-sm text-[#717171]  hover:text-gey-700 hover:underline"
						>
							¿Olvidaste tu contraseña?
						</a>
					</div>
				</form>
				<div className="flex justify-center items-center  gap-1 mt-6 text-center text-sm text-gray-500">
					<Image src="/advertencia.svg" alt="Logo" width={33} height={33} />
					<label htmlFor="developer">Desarrollado por Skillien.com</label>
				</div>
			</div>
		</div>
	);
}
