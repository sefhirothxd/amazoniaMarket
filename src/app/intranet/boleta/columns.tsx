'use client';

import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Empleado = {
	id: string;
	fecha: string;
	nombre: string;
	apellido: string;
	tienda: string;
	dni: string;
	pdf: string;
};

export const columns: ColumnDef<Empleado>[] = [
	{
		header: 'Fecha',
		accessorKey: 'fecha',
	},
	{
		header: 'Nombre',
		accessorKey: 'nombre',
	},
	{
		header: 'Apellido',
		accessorKey: 'apellido',
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
		accessorKey: 'pdf',
		cell: (row) => {
			return (
				<a
					className=" bg-[#636363] p-2 text-white rounded-md"
					href={row.row.original.pdf}
					target="_blank"
					rel="noreferrer"
				>
					Ver PDF
				</a>
			);
		},
	},
];
