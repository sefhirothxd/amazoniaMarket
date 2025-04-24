'use client';

import { useEffect, useState } from 'react';

import { useEmpleadoStore } from '@/store/useEmpleadoStore'; // Asegúrate de la ruta correcta
import { EditarEmpleadoModal } from '@/components/EditarEmpleadoModal'; // Asegúrate de la ruta correcta de este componente
import Image from 'next/image'; // Import the Next.js Image component

export type Empleado = {
	cargo_id: string;
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda: {
		nombre: string;
	} | null;
	correo: string;
	fecha_nacimiento: string;
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
	rol?: string;
	cargo: {
		nombre: string;
	} | null;
	fecha_renovacion?: string | null;
	contrato_url?: string;
};

export default function EmpleadosPage() {
	const {
		empleados,
		fetchGetEmpleado,
		empleado: userEmpleado,
	} = useEmpleadoStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [empleadoSeleccionado, setEmpleadoSeleccionado] =
		useState<Empleado | null>(null);

	useEffect(() => {
		if (userEmpleado?.rol === 'admin') {
			fetchGetEmpleado();
		}
	}, [userEmpleado?.rol, fetchGetEmpleado]);

	if (userEmpleado?.rol !== 'admin') {
		return <div>No tienes permisos para ver esta página</div>;
	}

	function formatearFechaLatam(fecha: string): string {
		if (!fecha) return '—';
		const [anio, mes, dia] = fecha.split('T')[0].split('-');
		return `${dia}/${mes}/${anio}`;
	}

	const handleEditClick = (empleado: Empleado) => {
		setEmpleadoSeleccionado(empleado);
		setModalOpen(true);
	};

	const handleSave = (empleadoActualizado: Empleado) => {
		console.log('Empleado actualizado:', empleadoActualizado);
		// Aquí iría la lógica para guardar los cambios (probablemente una llamada a tu API)
	};

	return (
		<div className="container mx-auto py-10 bg-white rounded-[25px] shadow-md px-4">
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 rounded-2xl overflow-hidden">
					<thead className="bg-black text-white  text-base font-light">
						<tr>
							<th className="px-4 py-2 border-b text-left">F.Ingreso</th>
							<th className="px-4 py-2  border-b text-left">F.Renovación</th>
							<th className="px-4 py-2  border-b text-left">Nombres</th>
							<th className="px-4 py-2  border-b text-left">Apellidos</th>
							<th className="px-4 py-2  border-b text-left">DNI</th>
							<th className="px-4 py-2  border-b text-left">Cargo</th>
							<th className="px-4 py-2  border-b text-left">Correo</th>
							<th className="px-4 py-2  border-b text-left">Teléfono</th>
							<th className="px-4 py-2  border-b text-left">Tienda</th>
							<th className="px-4 py-2  border-b text-left">Contrato</th>
							<th className="px-4 py-2  border-b text-left">Editar</th>
						</tr>
					</thead>
					<tbody>
						{empleados.map((empleado) => (
							<tr key={empleado.id} className="hover:bg-gray-50">
								<td className="py-2 px-4 border-b">
									{empleado.fecha_ingreso
										? formatearFechaLatam(empleado.fecha_ingreso)
										: '—'}
								</td>
								<td className="py-2 px-4 border-b">
									{empleado.fecha_renovacion
										? formatearFechaLatam(empleado.fecha_renovacion)
										: '—'}
								</td>
								<td className="py-2 px-4 border-b">{empleado.nombres}</td>
								<td className="py-2 px-4 border-b">{empleado.apellidos}</td>
								<td className="py-2 px-4 border-b">{empleado.dni}</td>
								<td className="py-2 px-4 border-b">
									{empleado.cargo?.nombre || '—'}
								</td>
								<td className="py-2 px-4 border-b">{empleado.correo}</td>
								<td className="py-2 px-4 border-b">{empleado.telefono}</td>
								<td className="py-2 px-4 border-b">
									{empleado.tienda?.nombre || '—'}
								</td>
								<td className="py-2 px-4 border-b">
									<a
										href={empleado.contrato_url || '#'}
										target="_blank"
										rel="noreferrer"
										className="bg-[#1EA7E1] flex items-center justify-center rounded-md py-[6px] gap-2 px-6 "
									>
										<Image
											src="/PDF.svg"
											alt="Descargar contrato"
											width={22}
											height={22}
										/>
										<p className="text-white font-light">Descargar</p>
									</a>
								</td>
								<td className="py-2 px-4 border-b">
									<button
										onClick={() =>
											handleEditClick({
												...empleado,
												cargo_id: empleado.cargo_id || '',
											})
										}
										className="bg-[#27BE4F] p-2 rounded-md flex items-center justify-center mx-auto w-[37px]"
									>
										<Image
											src="/edit.svg"
											alt="boton editar"
											width={21}
											height={21}
											className=""
										/>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{!empleados.length && (
					<p className="mt-4 text-gray-500">No hay empleados registrados.</p>
				)}
			</div>

			{/* Renderizamos el componente EditarEmpleadoModal */}
			{modalOpen && (
				<EditarEmpleadoModal
					open={modalOpen}
					onClose={() => setModalOpen(false)}
					empleado={empleadoSeleccionado}
					onSave={handleSave}
				/>
			)}
		</div>
	);
}
