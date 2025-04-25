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

		const emailComplet = email + '@amazoniamarket.pe';

		const { data: authData, error: authError } =
			await supabase.auth.signInWithPassword({
				email: emailComplet,
				password,
			});

		if (authError || !authData.session?.user) {
			console.log('🚀 ~ handleLogin ~ error:', authError);
			toast({
				title: 'Error',
				description: authError?.message || 'No se pudo iniciar sesión',
				action: <ToastAction altText="Undo">Intentar de nuevo</ToastAction>,
			});
			setLoading(false);
			return;
		}

		const userId = authData.session.user.id;

		// Consultar la tabla empleados para obtener el rol
		const { data: empleadoData, error: empleadoError } = await supabase
			.from('empleados')
			.select('rol')
			.eq('auth_user_id', userId)
			.single();

		if (empleadoError || !empleadoData) {
			toast({
				title: 'Error',
				description: 'No se pudo obtener el rol del usuario.',
			});
			setLoading(false);
			return;
		}

		// Redirige según el rol
		if (empleadoData.rol === 'admin') {
			router.push('/intranet/panel');
		} else {
			router.push('/intranet/usuario');
		}

		setLoading(false);
	};

	useEffect(() => {
		const checkSession = async () => {
			const { data: sessionData } = await supabase.auth.getSession();

			if (sessionData.session?.user) {
				const userId = sessionData.session.user.id;

				// Buscar el rol en la tabla empleados
				const { data: empleadoData, error: empleadoError } = await supabase
					.from('empleados')
					.select('rol')
					.eq('auth_user_id', userId)
					.single();

				if (empleadoError || !empleadoData) {
					console.log('Error al obtener el rol del empleado:', empleadoError);
					return;
				}

				// Redirigir según el rol
				if (empleadoData.rol === 'admin') {
					router.push('/dashboard');
				} else {
					router.push('/intranet/usuario');
				}
			}
		};

		checkSession();
	}, [router]);

	return (
		<div className=" flex justify-center lg:justify-between w-full bg-white h-screen">
			<div className="bg-white p-8 rounded-lg w-full max-w-[500px] flex flex-col justify-between">
				<div></div>
				<form onSubmit={handleLogin} className="space-y-6">
					<h1 className="text-[30px] text-center md:text-left md:text-[35px] font-bold  mb-[55px] text-black ">
						Visítanos y compra tus productos favoritos
					</h1>
					<div>
						<input
							placeholder="Correo electrónico"
							id="email"
							type="text"
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
							className="mt-1 block w-full px-3 py-2 border bg-gray-100 font-sans text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<button
						type="submit"
						disabled={loading}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-[15px] shadow-sm text-[22px] md:text-[28px] font-medium text-white bg-[#EA0029] hover:bg-red-800 transition-all  focus:outline-none focus:ring-2 focus:ring-offset-2"
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
					<label htmlFor="developer">
						Desarrollado por
						<a
							href="https://skillien.com"
							target="_blank"
							className="hover:underline ml-1"
						>
							Skillien.com
						</a>
					</label>
				</div>
			</div>
			<div className="hidden lg:block w-full h-full rounded-l-[45px] overflow-hidden ">
				<Image
					src="/fondoLogin.webp"
					alt="Logo"
					width={500}
					height={500}
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}
