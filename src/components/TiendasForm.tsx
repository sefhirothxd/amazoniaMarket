'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Asegúrate de que la ruta a tu cliente de Supabase sea correcta
import { Button } from '@/components/ui/button'; // Importa el componente Button de Shadcn UI

interface Props {
	onClose: () => void;
}

export default function AgregarTiendaForm({ onClose }: Props) {
	const [nombre, setNombre] = useState('');

	const [ciudad, setCiudad] = useState('');

	const [loading, setLoading] = useState(false);

	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const { data, error } = await supabase
				.from('tiendas')
				.insert([{ nombre, ciudad }])
				.single(); // Recomendado para obtener la fila insertada

			if (error) {
				console.error('Error al agregar la tienda:', error);
				setError(`Hubo un error al agregar la tienda: ${error.message}`);
			} else {
				console.log('Tienda agregada con éxito:', data);
				setNombre('');
				setCiudad(''); // Llama a la función onClose después de un éxito
				onClose();
			} // eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.error('Error inesperado al agregar la tienda:', error);
			setError(`Ocurrió un error inesperado: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">Agregar Nueva Tienda</h2>
					<Button variant="ghost" size="icon" onClick={onClose}>
						<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="sr-only">Cerrar</span>
					</Button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							htmlFor="nombre"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Nombre de la Tienda:
						</label>
						<input
							type="text"
							id="nombre"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="ciudad"
							className="block text-gray-700 text-sm font-bold mb-2"
						>
							Ciudad:
						</label>
						<input
							type="text"
							id="ciudad"
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							value={ciudad}
							onChange={(e) => setCiudad(e.target.value)}
							required
						/>
					</div>
					<div className="flex items-center justify-end">
						<Button variant="outline" className="mr-2" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit" disabled={loading}>
							{loading ? 'Guardando...' : 'Agregar Tienda'}
						</Button>
					</div>
					{error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
				</form>
			</div>
		</div>
	);
}
