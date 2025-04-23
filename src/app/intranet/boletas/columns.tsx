'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';

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
	anio_num: number; // Añade esta línea
	mes_num: number; // Añade esta línea
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
				<a href={row.row.original.ruta_pdf} target="_blank" rel="noreferrer">
					<FileDown className="h-6 w-h-6" />
				</a>
			);
		},
	},
];
