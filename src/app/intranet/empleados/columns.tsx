import { ColumnDef } from '@tanstack/react-table';
import { FileDown } from 'lucide-react';
import { clsx } from 'clsx'; // Asegúrate de tener esto instalado

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

function formatearFechaLatam(fecha: string): string {
	if (!fecha) return '—';
	const [anio, mes, dia] = fecha.split('T')[0].split('-');
	return `${dia}/${mes}/${anio}`;
}

export function getRenovacionColor(fechaRenovacion?: string | null) {
	if (!fechaRenovacion) return '';
	const hoy = new Date();
	const fecha = new Date(fechaRenovacion.split('T')[0]);
	const diff = Math.ceil(
		(fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
	);
	if (diff < 0) return 'bg-red-300'; // vencido
	if (diff <= 14) return 'bg-yellow-300'; // por vencer
	return '';
}

export const columns: ColumnDef<Empleado>[] = [
	{
		accessorKey: 'fecha_ingreso',
		header: () => <div className="w-[100px]">F. Ingreso</div>,
		cell: ({ row }) => {
			const fecha = row.getValue('fecha_ingreso') as string;
			return (
				<div className="w-[100px] truncate">{formatearFechaLatam(fecha)}</div>
			);
		},
	},
	{
		accessorKey: 'fecha_renovacion',
		header: () => <div className="w-[100px]">F. Renovación</div>,
		cell: ({ row }) => {
			const fecha = row.getValue('fecha_renovacion') as string;

			return (
				<div className={clsx('w-[100px] truncate')}>
					{fecha ? formatearFechaLatam(fecha) : '—'}
				</div>
			);
		},
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
