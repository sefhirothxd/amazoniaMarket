import { ColumnDef } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';

export type Empleado = {
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda: {
		nombre: string;
	} | null;
	correo: string;
	fecha_nacimiento: string;
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
	rol?: string;
	cargo: {
		nombre: string;
	} | null;
	fecha_renovacion?: string | null;
	contrato_url?: string;
};

export const columns: ColumnDef<Empleado>[] = [
	{
		accessorKey: 'fecha_ingreso',
		header: () => <div className="w-[100px]">F. Ingreso</div>,
		cell: ({ row }) => (
			<div className="w-[100px] truncate">{row.getValue('fecha_ingreso')}</div>
		),
	},
	{
		accessorKey: 'fecha_renovacion',
		header: () => <div className="w-[100px]">F. Renovación</div>,
		cell: ({ row }) => (
			<div className="w-[100px] truncate">
				{row.getValue('fecha_renovacion')}
			</div>
		),
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
		accessorFn: (row) => row.cargo?.nombre ?? '—',
		id: 'cargo',
		header: () => <div className="w-[120px]">Cargo</div>,
		cell: ({ row }) => (
			<div className="w-[120px] truncate">{row.getValue('cargo')}</div>
		),
	},
	{
		accessorKey: 'correo',
		header: 'Correo',
	},
	{
		accessorKey: 'telefono',
		header: 'Teléfono',
	},
	{
		accessorFn: (row) => row.tienda?.nombre ?? '—',
		id: 'tienda',
		header: () => <div className="w-[120px]">Tienda</div>,
		cell: ({ row }) => (
			<div className="w-[120px] truncate">{row.getValue('tienda')}</div>
		),
	},
	{
		header: 'Contrato',
		accessorKey: 'contrato_url',
		cell: ({ row }) => {
			const url = row.original.contrato_url;
			return url ? (
				<a href={url} target="_blank" rel="noreferrer">
					<FileDown className="h-6 w-6" />
				</a>
			) : (
				<span>—</span>
			);
		},
	},
];
