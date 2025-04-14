'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Empleado = {
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda_id: number;
	tienda?: string;
	correo: string;
	fecha_nacimiento: string;
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
};

export const columns: ColumnDef<Empleado>[] = [
	// {
	// 	accessorKey: 'id',
	// 	header: 'ID',
	// },
	{
		accessorKey: 'nombres',
		header: 'Nombres',
	},
	{
		accessorKey: 'apellidos',
		header: 'Apellidos',
	},
	{
		accessorKey: 'telefono',
		header: 'Teléfono',
	},
	{
		accessorKey: 'direccion',
		header: 'Dirección',
	},
	{
		accessorKey: 'dni',
		header: 'DNI',
	},
	{
		accessorKey: 'tienda.nombre',
		header: 'Tienda',
	},

	{
		accessorKey: 'correo',
		header: 'Correo',
	},
	{
		accessorKey: 'fecha_nacimiento',
		header: 'F. de Nacimiento',
	},
	{
		accessorKey: 'fecha_ingreso',
		header: 'F. de Ingreso',
	},
	{
		accessorKey: 'fecha_salida',
		header: 'F. de Salida',
	},
	{
		accessorKey: 'estado',
		header: 'Estado',
		cell: ({ row }) => (row.original.estado ? 'Activo' : 'Inactivo'),
	},
];
