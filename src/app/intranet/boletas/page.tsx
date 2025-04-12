/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';

import { Empleado, columns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase';

async function getData(): Promise<Empleado[]> {
	// Fetch data from your API here.

	const { data, error } = (await supabase.from('boletas_pago').select(`
	  anio,
	  mes,
	  ruta_pdf,
	  empleado:empleados(
		nombres,
		apellidos,
		dni,
		tienda:tiendas(nombre)
	  )
	
	`)) as any;
	console.log('data:', data);
	console.log('error:', error);

	// getdata from api

	return data.map((boleta: Empleado) => ({
		fecha: `${boleta.mes}-${boleta.anio}`,
		nombres: boleta.empleado?.nombres,
		apellidos: boleta.empleado?.apellidos,
		dni: boleta.empleado?.dni,
		tienda: boleta.empleado?.tienda?.nombre,
		ruta_pdf: boleta.ruta_pdf,
	}));
}

export default function DemoPage() {
	const [data, setData] = useState<Empleado[]>([]);

	useEffect(() => {
		async function fetchData() {
			const result = await getData();
			setData(result);
		}
		fetchData();
	}, []);

	return (
		<div className="container mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
