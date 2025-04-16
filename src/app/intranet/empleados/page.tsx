'use client';
import { useEffect } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

export default function DemoPage() {
	// const [data, setData] = useState<Empleado[]>([]);
	const { empleados, fetchGetEmpleado, empleado } = useEmpleadoStore();

	useEffect(() => {
		if (empleado?.rol === 'admin') {
			fetchGetEmpleado();
		}
	}, [empleado?.rol]);

	if (empleado?.rol !== 'admin') {
		// Si no es admin, puedes redirigir o mostrar un mensaje
		return <div>No tienes permisos para ver esta página</div>;
	}

	return (
		<div className="container  mx-auto py-10">
			<DataTable columns={columns} data={empleados} />
		</div>
	);
}
