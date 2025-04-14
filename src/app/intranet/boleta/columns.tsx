import { ColumnDef } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';

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
		cell: ({ row }) => (
			<a href={row.original.ruta_pdf} target="_blank" rel="noreferrer">
				<FileDown className="h-6 w-h-6" />
			</a>
		),
	},
];
