/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';

import { Empleado, columns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

async function getData(): Promise<Empleado[]> {
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

	return data.map((boleta: any) => {
		const mes = String(boleta.mes).padStart(2, '0'); // Aseguramos que el mes tenga 2 dígitos
		const anio_num = parseInt(boleta.anio, 10);
		const mes_num = parseInt(boleta.mes, 10);

		return {
			fecha: `${mes}/${boleta.anio}`,
			nombres: boleta.empleado?.nombres,
			apellidos: boleta.empleado?.apellidos,
			dni: boleta.empleado?.dni,
			tienda: boleta.empleado?.tienda?.nombre,
			ruta_pdf: boleta.ruta_pdf,
			anio_num: anio_num,
			mes_num: mes_num,
		};
	});
}

export default function DemoPage() {
	const { empleado } = useEmpleadoStore();
	const [data, setData] = useState<Empleado[]>([]);

	useEffect(() => {
		if (empleado?.rol === 'admin') {
			async function fetchData() {
				const result = await getData();
				console.log('result before sort:', result);

				const sortedData = result.sort((a, b) => {
					if (b.anio_num !== a.anio_num) {
						return b.anio_num - a.anio_num;
					}
					return b.mes_num - a.mes_num;
				});

				console.log('result after sort:', sortedData);
				setData(sortedData as Empleado[]);
			}
			fetchData();
		}
	}, [empleado?.rol]);

	if (empleado?.rol !== 'admin') {
		return <div>No tienes permisos para ver esta página</div>;
	}

	return (
		<div className=" w-full mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
