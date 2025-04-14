/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';

import { Empleado, columns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

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
	const { empleado } = useEmpleadoStore();
	const [data, setData] = useState<Empleado[]>([]);

	useEffect(() => {
		if (empleado?.rol === 'admin') {
			async function fetchData() {
				const result = await getData();
				console.log('result:', result);
				setData(result);
			}
			fetchData();
		}
	}, [empleado?.rol]);

	if (empleado?.rol !== 'admin') {
		// Si no es admin, puedes redirigir o mostrar un mensaje
		return <div>No tienes permisos para ver esta página</div>;
	}

	return (
		<div className=" w-full mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
