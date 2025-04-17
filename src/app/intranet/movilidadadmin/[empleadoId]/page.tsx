'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface MovilidadMes {
	id: number;
	anio: number;
	mes: number;
	estado: string;
}

interface Empleado {
	nombres: string;
	apellidos: string;
	dni: string;
}

export default function EmpleadoMovilidadMesesPage() {
	const { empleadoId } = useParams();
	const router = useRouter();

	const [empleado, setEmpleado] = useState<Empleado | null>(null);
	const [meses, setMeses] = useState<MovilidadMes[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const [{ data: empleadoData }, { data: mesesData, error: mesesError }] =
				await Promise.all([
					supabase
						.from('empleados')
						.select('nombres, apellidos, dni')
						.eq('id', empleadoId)
						.single(),
					supabase
						.from('movilidad_mes')
						.select('id, anio, mes, estado')
						.eq('empleado_id', empleadoId)
						.order('anio', { ascending: false })
						.order('mes', { ascending: false }),
				]);

			if (mesesError) {
				console.error(mesesError);
				return;
			}

			setEmpleado(empleadoData);
			setMeses(mesesData);
			setLoading(false);
		};

		fetchData();
	}, [empleadoId]);

	const toggleEstado = async (mesId: number, nuevoEstado: string) => {
		const { error } = await supabase
			.from('movilidad_mes')
			.update({ estado: nuevoEstado })
			.eq('id', mesId);

		if (!error) {
			setMeses((prev) =>
				prev.map((mes) =>
					mes.id === mesId ? { ...mes, estado: nuevoEstado } : mes
				)
			);
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md capitalize">
			{empleado && (
				<div className="text-2xl font-bold mb-6">
					<p>
						{empleado.nombres} {empleado.apellidos}
					</p>
					<p>({empleado.dni})</p>
				</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{loading ? (
					<p>Cargando...</p>
				) : meses.length === 0 ? (
					<p>No hay registros de movilidad.</p>
				) : (
					meses.map((mes) => (
						<Card
							key={mes.id}
							className={`cursor-pointer hover:shadow-lg transition ${
								mes.estado === 'abierto' ? 'bg-[#A5F4C9]' : 'bg-[#F4A5A5]'
							} `}
							onClick={() => router.push(`/intranet/movilidad/${mes.id}`)}
						>
							<CardContent className="py-2 px-8 h-[240px] flex flex-col justify-between">
								<div className="p-0 flex h-full  justify-start items-end text-gray-700 font-bold ">
									<p className="text-[35px] leading-none">
										{nombreMes(mes.mes)} <br /> {mes.anio}
									</p>
								</div>

								<div className="w-full flex items-center justify-end">
									<button
										className=" mt-3 flex flex-col justify-center items-center"
										onClick={(e) => {
											e.stopPropagation(); // evitar que también se ejecute el onClick del card
											toggleEstado(
												mes.id,
												mes.estado === 'abierto' ? 'cerrado' : 'abierto'
											);
										}}
									>
										<figure
											className={`px-4 py-3 rounded-full ${
												mes.estado === 'abierto'
													? 'bg-[#27BE4F]'
													: 'bg-[#F00E0E]'
											}`}
										>
											<Image
												src={
													mes.estado === 'abierto'
														? '/candadoAbierto.svg'
														: '/candadoCerrado.svg'
												}
												alt="Estado"
												width={40}
												height={53}
												className={`block h-[40px] w-[33px] `}
											/>
										</figure>
										<p
											className={`${
												mes.estado !== 'abierto'
													? 'text-[#E21010]'
													: 'text-[#27BE4F]'
											} capitalize font-semibold`}
										>
											{mes.estado}
										</p>
									</button>
								</div>
							</CardContent>
						</Card>
					))
				)}
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
