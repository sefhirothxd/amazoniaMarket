// app/panel/page.tsx o app/panel/PANEL_COMPONENT.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Store, User, FileArchive } from 'lucide-react';

export default function PanelPage() {
	const [usuarios, setUsuarios] = useState(0);
	const [tiendas, setTiendas] = useState(0);
	const [boletas, setBoletas] = useState(0);

	useEffect(() => {
		const fetchCounts = async () => {
			const [usuariosRes, tiendasRes, boletasRes] = await Promise.all([
				supabase.from('empleados').select('*', { count: 'exact', head: true }),
				supabase.from('tiendas').select('*', { count: 'exact', head: true }),
				supabase
					.from('boletas_pago')
					.select('*', { count: 'exact', head: true }),
			]);

			setUsuarios(usuariosRes.count || 0);
			setTiendas(tiendasRes.count || 0);
			setBoletas(boletasRes.count || 0);
		};

		fetchCounts();
	}, []);

	return (
		<div className="p-6 space-y-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				<Card className="rounded-2xl shadow-md ">
					<CardHeader className="flex-row  justify-between pb-1 ">
						<CardTitle className="text-[#B8B8B8] text-[20px] ">
							Usuarios
						</CardTitle>
						<div className="bg-red-100 rounded-[25px] p-2">
							<User className="h-[51px] w-[51px] text-[#EA0029] " />
						</div>
					</CardHeader>
					<CardContent className="pb-2">
						<p className="text-[50px] text-[#636363] font-semibold">
							{usuarios}
						</p>
					</CardContent>
					<CardFooter className="bg-[#EA0029] rounded-b-2xl"></CardFooter>
				</Card>

				<Card className="rounded-2xl shadow-md">
					<CardHeader className="flex-row  justify-between pb-1 ">
						<CardTitle className="text-[#B8B8B8] text-[20px]">
							Tiendas
						</CardTitle>
						<div className="bg-green-100 rounded-[25px] p-2">
							<Store className="h-[51px] w-[51px] text-[#27BE4F] " />
						</div>
					</CardHeader>
					<CardContent className="pb-2">
						<p className="text-[50px] text-[#636363] font-semibold">
							{tiendas}
						</p>
					</CardContent>
					<CardFooter className="bg-[#27BE4F] rounded-b-2xl"></CardFooter>
				</Card>

				<Card className="rounded-2xl shadow-md ">
					<CardHeader className="flex-row  justify-between pb-1 ">
						<CardTitle className="text-[#B8B8B8] text-[20px]">
							Boletas de pago
						</CardTitle>
						<div className="bg-violet-100 rounded-[25px] p-2">
							<FileArchive className="h-[51px] w-[51px] text-[#D90DEC] " />
						</div>
					</CardHeader>
					<CardContent className="pb-2">
						<p className="text-[50px] text-[#636363] font-semibold">
							{boletas}
						</p>
					</CardContent>
					<CardFooter className="bg-[#D90DEC] rounded-b-2xl"></CardFooter>
				</Card>
			</div>
		</div>
	);
}
