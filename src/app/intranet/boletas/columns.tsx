'use client';

import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

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
				<a
					href={row.row.original.ruta_pdf}
					target="_blank"
					className="bg-[#27BE4F] p-2 rounded-md flex items-center justify-center mx-auto w-[37px]"
					rel="noreferrer"
				>
					<Image
						src="/edit.svg"
						alt="boton editar"
						width={21}
						height={21}
						className=""
					/>
				</a>
			);
		},
	},
];
