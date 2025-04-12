'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Empleado = {
	anio: number;
	mes: number;
	ruta_pdf: string;
	empleado: {
		nombres: string;
		apellidos: string;
		dni: string;
		tienda: {
			nombre: string;
		};
	};
};

export const columns: ColumnDef<Empleado>[] = [
	{
		header: 'Fecha',
		accessorKey: 'fecha',
	},
	{
		header: 'Nombres',
		accessorKey: 'nombres',
	},
	{
		header: 'Apellidos',
		accessorKey: 'apellidos',
	},
	{
		header: 'Tienda',
		accessorKey: 'tienda',
	},
	{
		header: 'DNI',
		accessorKey: 'dni',
	},
	{
		header: 'PDF',
		accessorKey: 'ruta_pdf',
		cell: (row) => {
			return (
				<a
					className=" bg-[#636363] p-2 text-white rounded-md"
					href={row.row.original.ruta_pdf}
					target="_blank"
					rel="noreferrer"
				>
					Ver PDF
				</a>
			);
		},
	},
];
