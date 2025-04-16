// pages/movilidad/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function MovilidadPage() {
	interface Empleado {
		id: string;
		nombre: string;
		dni: string;
	}

	const [empleado, setEmpleado] = useState<Empleado | null>(null);
	const [meses, setMeses] = useState<
		{ id: string; mes: number; anio: number; estado: string }[]
	>([]);
	const supabase = createClient(supabaseUrl, supabaseKey);

	useEffect(() => {
		const obtenerDatos = async () => {
			const { data: user } = await supabase.auth.getUser();
			const userId = user?.user?.id;

			const { data: emp } = await supabase
				.from('empleados')
				.select('*')
				.eq('auth_user_id', userId)
				.single();

			setEmpleado(emp);

			await generarMesActualMovilidad(emp.id);

			const { data: mesesData } = await supabase
				.from('movilidad_mes')
				.select('*')
				.eq('empleado_id', emp.id)
				.order('anio', { ascending: true })
				.order('mes', { ascending: true });

			setMeses(mesesData || []);
		};

		obtenerDatos();
	}, []);

	const generarMesActualMovilidad = async (empleado_id: string) => {
		const fechaActual = new Date();
		const mes = fechaActual.getMonth() + 1; // ✅ Corregido
		const anio = fechaActual.getFullYear();

		const { data: mesExistente } = await supabase
			.from('movilidad_mes')
			.select('id')
			.eq('empleado_id', empleado_id)
			.eq('mes', mes)
			.eq('anio', anio)
			.single();

		if (mesExistente) return mesExistente.id;

		const { data: nuevoMes, error: errorNuevoMes } = await supabase
			.from('movilidad_mes')
			.insert([{ empleado_id, mes, anio, estado: 'abierto' }])
			.select()
			.single();

		if (errorNuevoMes) {
			if (errorNuevoMes.code === '23505') {
				console.warn('El mes ya existe. Ignorando error.');
				return;
			}
			console.error(
				'Error al crear el nuevo mes:',
				JSON.stringify(errorNuevoMes, null, 2)
			);
			return;
		}

		if (!nuevoMes) {
			console.error('La creación del mes no devolvió ningún dato');
			return;
		}

		const diasEnElMes = new Date(anio, mes, 0).getDate();

		const dias = Array.from({ length: diasEnElMes }, (_, i) => ({
			mes_id: nuevoMes.id,
			dia: i + 1,
			motivo: '',
			destino: '',
			monto: null,
		}));

		await supabase.from('movilidad_dia').insert(dias);

		return nuevoMes.id;
	};

	return (
		<div className="p-6">
			{empleado && (
				<div className="mb-4">
					<h2 className="text-xl font-bold">👤 {empleado.nombre}</h2>
					<p>DNI: {empleado.dni}</p>
				</div>
			)}

			<h3 className="text-lg font-semibold mb-2">Meses de movilidad:</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{meses.map((mes) => {
					const fecha = new Date();
					const mesActual = fecha.getMonth() + 1;
					const anioActual = fecha.getFullYear();
					const esMesActual = mes.mes === mesActual && mes.anio === anioActual;

					const color = esMesActual ? 'bg-green-500' : 'bg-red-400';
					const icono = esMesActual ? '🔓' : '🔒';
					const pointer = esMesActual ? 'cursor-pointer' : 'cursor-not-allowed';

					const contenidoMes = (
						<div
							className={`p-4 rounded-xl text-white hover:opacity-90 ${color} ${pointer}`}
						>
							<h4 className="text-lg font-bold">
								{icono} {nombreMes(mes.mes)} {mes.anio}
							</h4>
							<p className="mt-2 font-medium">
								Estado: {mes.estado === 'abierto' ? 'Abierto' : 'Cerrado'}
							</p>
						</div>
					);

					return esMesActual ? (
						<Link href={`/intranet/movilidad/${mes.id}`} key={mes.id}>
							{contenidoMes}
						</Link>
					) : (
						<div key={mes.id}>{contenidoMes}</div>
					);
				})}
			</div>
		</div>
	);
}

function nombreMes(mes: number): string {
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];
	return meses[mes - 1];
}
