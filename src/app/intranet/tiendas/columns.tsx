'use client';

import { ColumnDef } from '@tanstack/react-table';

// Re-using the Tienda interface you provided
export interface Tienda {
	id: number;
	nombre: string;
	ciudad: string;
	created_at?: string | null; // O Date si prefieres trabajar con objetos Date
}

export const columns: ColumnDef<Tienda>[] = [
	{
		header: 'Nombre',
		accessorKey: 'nombre',
	},
	{
		header: 'Ciudad',
		accessorKey: 'ciudad',
	},
	{
		header: 'Creado En',
		accessorKey: 'created_at',
		cell: ({ row }) =>
			row.getValue('created_at')
				? new Date(row.getValue('created_at') as string).toLocaleDateString()
				: 'N/A',
	},
];
