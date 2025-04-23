/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';

import { Tienda, columns as baseColumns } from './columns';
import { DataTable } from './data-table';
import { supabase } from '@/lib/supabase'; // Asegúrate de que la ruta sea correcta
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

export default function DemoPage() {
	const { empleado } = useEmpleadoStore();
	const [data, setData] = useState<Tienda[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { toast } = useToast();

	const fetchData = async () => {
		setLoading(true);
		setError(null);

		try {
			const { data: tiendasData, error: tiendasError } = await supabase
				.from('tiendas')
				.select('*')
				.order('nombre', { ascending: true });

			if (tiendasError) {
				console.error('Error fetching tiendas:', tiendasError);
				setError(`Error al cargar las tiendas: ${tiendasError.message}`);
			} else {
				setData(tiendasData as Tienda[]);
			}
		} catch (err: any) {
			console.error('Unexpected error fetching tiendas:', err);
			setError(`Error inesperado: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (empleado?.rol === 'admin') {
			fetchData();
		}
	}, [empleado?.rol]);

	const handleEliminarTienda = async (id: number) => {
		if (!window.confirm('¿Estás seguro de que deseas eliminar esta tienda?')) {
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const { error: deleteError } = await supabase
				.from('tiendas')
				.delete()
				.eq('id', id);

			if (deleteError) {
				toast({
					title: 'Tienda no eliminada',
					description: 'Error al eliminar la tienda',
					action: <ToastAction altText="Ok">Cerrar</ToastAction>,
				});
				return;
			} else {
				toast({
					title: 'Tienda eliminada',
					description: 'La tienda ha sido eliminada correctamente',
					action: <ToastAction altText="Ok">Cerrar</ToastAction>,
				});
				fetchData(); // Recargar los datos después de la eliminación
			}
		} catch (err: any) {
			console.error('Error inesperado al eliminar la tienda:', err);
			toast({
				title: 'Error inesperado',
				description: 'Error al eliminar la tienda',
				action: <ToastAction altText="Ok">Cerrar</ToastAction>,
			});
		} finally {
			setLoading(false);
		}
	};

	// Agrega la columna de eliminar al array de columnas base
	const columns = [
		...baseColumns,
		{
			id: 'actions',
			header: 'Acciones',
			cell: ({ row }: { row: { original: Tienda } }) => (
				<Button
					variant="destructive"
					size="sm"
					onClick={() => handleEliminarTienda(row.original.id)}
					disabled={loading}
				>
					Eliminar
				</Button>
			),
		},
	];

	if (empleado?.rol !== 'admin') {
		return <div>No tienes permisos para ver esta página</div>;
	}

	if (loading) {
		return <div>Cargando tiendas...</div>;
	}

	if (error) {
		return (
			<div className="text-red-500">Error al cargar las tiendas: {error}</div>
		);
	}

	return (
		<div className=" w-full mx-auto py-10">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
