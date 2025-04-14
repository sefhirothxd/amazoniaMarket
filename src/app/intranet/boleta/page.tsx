'use client';
import { useState, useEffect } from 'react';

import { FormattedBoleta, columns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

export default function DemoPage() {
	const [data, setData] = useState<FormattedBoleta[]>([]);
	const { empleado } = useEmpleadoStore();

	async function fetchData(id: number) {
		const { data, error } = await supabase
			.from('boletas_pago')
			.select(
				`
				anio,
				mes,
				ruta_pdf,
				empleado:empleados(
				  nombres,
				  apellidos,
				  dni,
				  tienda:tiendas(nombre)
				)
			  `
			)
			.eq('empleado_id', id);

		if (error) {
			console.error('Error fetching data:', error);
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const formattedData = (data || []).map((boleta: any) => ({
			fecha: `${boleta.mes}-${boleta.anio}`,
			nombres: boleta.empleado?.nombres ?? '',
			apellidos: boleta.empleado?.apellidos ?? '',
			dni: boleta.empleado?.dni ?? '',
			tienda: boleta.empleado?.tienda?.nombre ?? '',
			ruta_pdf: boleta.ruta_pdf,
		}));

		setData(formattedData);
	}

	useEffect(() => {
		if (empleado?.id) {
			fetchData(empleado.id);
		}
	}, [empleado?.id]);

	return (
		<div className="w-full mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
