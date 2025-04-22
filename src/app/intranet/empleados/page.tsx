'use client';
import { useEffect, useState } from 'react';

import { columns as baseColumns } from './columns';
import { DataTable } from './data-table';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { Empleado } from './columns';
import { EditarEmpleadoModal } from '@/components/EditarEmpleadoModal';

export default function DemoPage() {
	const { empleados, fetchGetEmpleado, empleado } = useEmpleadoStore();
	const [modalOpen, setModalOpen] = useState(false);
	const [empleadoSeleccionado, setEmpleadoSeleccionado] =
		useState<Empleado | null>(null);

	useEffect(() => {
		if (empleado?.rol === 'admin') {
			fetchGetEmpleado();
		}
	}, [empleado?.rol]);

	if (empleado?.rol !== 'admin') {
		return <div>No tienes permisos para ver esta página</div>;
	}

	// función que se llama al hacer clic en el botón editar
	const handleEditClick = (empleado: Empleado) => {
		setEmpleadoSeleccionado(empleado);
		setModalOpen(true);
	};

	const handleSave = (empleadoActualizado: Empleado) => {
		console.log('Empleado actualizado:', empleadoActualizado);
		// Aquí podrías hacer una llamada a Supabase o a tu API
	};

	// Agregamos la columna "Editar" dinámicamente
	const columns = [
		...baseColumns,
		{
			id: 'acciones',
			header: 'Acciones',
			cell: ({ row }: { row: { original: Empleado } }) => (
				<button
					onClick={() => handleEditClick(row.original)}
					className="text-blue-600 hover:underline"
				>
					✏️ Editar
				</button>
			),
		},
	];

	return (
		<div className="container mx-auto py-10 bg-white rounded-[25px] shadow-md px-4">
			<DataTable columns={columns} data={empleados} />
			<EditarEmpleadoModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				empleado={empleadoSeleccionado}
				onSave={handleSave}
			/>
		</div>
	);
}
