'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface EmpleadoConMes {
	apellidos: string;
	empleado_id: string;
	nombres: string;
	dni: string;
	mes_id: number;
}

export default function MovilidadAdminPage() {
	const [empleados, setEmpleados] = useState<EmpleadoConMes[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const { data: meses, error: errorMeses } = await supabase
				.from('movilidad_mes')
				.select('id, empleado_id')
				.order('created_at', { ascending: false });

			if (errorMeses) {
				console.error('Error cargando meses:', errorMeses.message);
				return;
			}

			const empleadoIds = meses.map((m) => m.empleado_id);
			const { data: empleados, error: errorEmpleados } = await supabase
				.from('empleados')
				.select('id, nombres, apellidos, dni')
				.in('id', empleadoIds);

			if (errorEmpleados) {
				console.error('Error cargando empleados:', errorEmpleados.message);
				return;
			}

			// evitar duplicados por empleado
			const empleadosConMes: EmpleadoConMes[] = [];
			const empleadosVistos = new Set();

			for (const mes of meses) {
				if (empleadosVistos.has(mes.empleado_id)) continue;

				const empleado = empleados.find((e) => e.id === mes.empleado_id);
				if (!empleado) continue;

				empleadosVistos.add(empleado.id);

				empleadosConMes.push({
					empleado_id: empleado.id,
					nombres: empleado.nombres,
					apellidos: empleado.apellidos,
					dni: empleado.dni,
					mes_id: mes.id,
				});
			}

			setEmpleados(empleadosConMes);
			setLoading(false);
		};

		fetchData();
	}, []);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Movilidad - Administración</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{loading
					? Array.from({ length: 6 }).map((_, i) => (
							<Skeleton key={i} className="h-40" />
					  ))
					: empleados.map((empleado) => (
							<Link
								key={empleado.mes_id}
								href={`/intranet/movilidadadmin/${empleado.mes_id}`}
							>
								<Card
									key={empleado.mes_id}
									className={
										cn('cursor-pointer hover:bg-gray-50 transition') +
										` bg-[#FFFAE8] h-[180px]`
									}
								>
									<CardContent className="flex flex-col items-start capitalize gap-4 p-4">
										<div className="bg-[#DDC568] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
											{empleado.nombres[0]}
										</div>
										<div>
											<p className="font-semibold leading-tight text-[20px]">
												{empleado.nombres} {empleado.apellidos}
											</p>
											<p className="text-sm text-gray-500">
												DNI: {empleado.dni}
											</p>
										</div>
									</CardContent>
								</Card>
							</Link>
					  ))}
			</div>
		</div>
	);
}
