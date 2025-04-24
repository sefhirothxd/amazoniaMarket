import { ColumnDef } from '@tanstack/react-table';

import Image from 'next/image';

export interface FormattedBoleta {
	fecha: string;
	nombres: string;
	apellidos: string;
	dni: string;
	tienda: string;
	ruta_pdf: string;
}

export const columns: ColumnDef<FormattedBoleta>[] = [
	{
		accessorKey: 'fecha',
		header: 'Fecha',
	},
	{
		accessorKey: 'nombres',
		header: 'Nombres',
	},
	{
		accessorKey: 'apellidos',
		header: 'Apellidos',
	},
	{
		accessorKey: 'dni',
		header: 'DNI',
	},
	{
		accessorKey: 'tienda',
		header: 'Tienda',
	},
	{
		accessorKey: 'ruta_pdf',
		header: 'PDF',
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
