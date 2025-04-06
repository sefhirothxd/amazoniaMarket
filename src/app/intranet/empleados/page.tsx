'use client';
import { useEffect } from 'react';

import { columns } from './columns';
import { DataTable } from './data-table';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

export default function DemoPage() {
	// const [data, setData] = useState<Empleado[]>([]);
	const { empleados, fetchGetEmpleado } = useEmpleadoStore();

	useEffect(() => {
		fetchGetEmpleado();
	}, [fetchGetEmpleado]);

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={empleados} />
		</div>
	);
}
