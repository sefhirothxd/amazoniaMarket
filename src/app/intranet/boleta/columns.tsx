import { ColumnDef } from '@tanstack/react-table';

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
			<a
				className=" bg-[#636363] p-2 text-white rounded-md"
				href={row.original.ruta_pdf}
				target="_blank"
				rel="noreferrer"
			>
				Ver PDF
			</a>
		),
	},
];
