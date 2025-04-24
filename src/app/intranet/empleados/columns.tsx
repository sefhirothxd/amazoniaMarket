import { ColumnDef } from '@tanstack/react-table';
import { clsx } from 'clsx'; // Asegúrate de tener esto instalado
import Image from 'next/image';

export type Empleado = {
	cargo_id: string; // <--- Asegúrate de que esta propiedad esté aquí
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
		cell: ({ row }) => (
			<div className="w-[100px] truncate">
				{formatearFechaLatam(row.getValue('fecha_ingreso') as string)}
			</div>
		),
	},
	{
		accessorKey: 'fecha_renovacion',
		header: () => <div className="w-[100px]">F. Renovación</div>,
		cell: ({ row }) => (
			<div className={clsx('w-[100px] truncate')}>
				{formatearFechaLatam(row.getValue('fecha_renovacion') as string) || '—'}
			</div>
		),
	},
	{
		accessorKey: 'nombres',
		header: 'Nombres',
		cell: ({ row }) => row.getValue('nombres'), // Añadido cell
	},
	{
		accessorKey: 'apellidos',
		header: 'Apellidos',
		cell: ({ row }) => row.getValue('apellidos'), // Añadido cell
	},
	{
		accessorKey: 'dni',
		header: 'DNI',
		cell: ({ row }) => row.getValue('dni'), // Añadido cell
	},
	{
		accessorFn: (row) => row.cargo?.nombre ?? '—',
		id: 'cargo',
		header: () => <div className="w-[120px]">Cargo</div>,
		cell: ({ row }) => (
			<div className="w-[120px] truncate">
				{row.getValue('cargo') as string}
			</div>
		),
	},
	{
		accessorKey: 'correo',
		header: 'Correo',
		cell: ({ row }) => row.getValue('correo'), // Añadido cell
	},
	{
		accessorKey: 'telefono',
		header: 'Teléfono',
		cell: ({ row }) => row.getValue('telefono'), // Añadido cell
	},
	{
		accessorFn: (row) => row.tienda?.nombre ?? '—',
		id: 'tienda',
		header: () => <div className="w-[120px]">Tienda</div>,
		cell: ({ row }) => (
			<div className="w-[120px] truncate">
				{row.getValue('tienda') as string}
			</div>
		),
	},
	{
		header: 'Contrato',
		accessorKey: 'contrato_url',
		cell: ({ row }) => {
			const url = row.original.contrato_url;
			return url ? (
				<a
					href={url}
					target="_blank"
					rel="noreferrer"
					className="bg-[#1EA7E1] flex items-center justify-center rounded-md py-[6px] gap-2 px-4"
				>
					<Image
						src="/PDF.svg"
						alt="Descargar contrato"
						width={22}
						height={22}
					/>
					<p className="text-white font-light">Descargar</p>
				</a>
			) : (
				<span>—</span>
			);
		},
	},
];
