'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';

// 📌 Esquema de validación con Yup
const schema = yup.object().shape({
	dni: yup
		.string()
		.length(8, 'El DNI debe tener 8 dígitos')
		.required('El DNI es obligatorio'),
	nombres: yup
		.string()
		.min(3, 'Mínimo 3 caracteres')
		.required('El nombre es obligatorio'),
	apellidos: yup
		.string()
		.min(3, 'Mínimo 3 caracteres')
		.required('El apellido es obligatorio'),
	correo: yup
		.string()
		.email('Correo inválido')
		.required('El correo es obligatorio'),
	telefono: yup
		.string()
		.matches(/^\d{9}$/, 'Debe tener 9 dígitos')
		.required('El teléfono es obligatorio'),
	direccion: yup
		.string()
		.min(3, 'Mínimo 3 caracteres')
		.required('La dirección es obligatoria'),
	fecha_nacimiento: yup
		.date()
		.required('La fecha de nacimiento es obligatoria')
		.max(new Date(), 'La fecha de nacimiento no puede ser futura'),
	fecha_ingreso: yup
		.date()
		.required('La fecha de ingreso es obligatoria')
		.max(new Date(), 'La fecha de ingreso no puede ser futura'),
	tienda_id: yup.string().required('Selecciona una tienda'),
});
type FormData = yup.InferType<typeof schema>;

interface EmpleadoFormProps {
	onClose: () => void;
}

export default function EmpleadoForm({ onClose }: EmpleadoFormProps) {
	const [tiendas, setTiendas] = useState<{ id: string; nombre: string }[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});
	const { fetchGetEmpleado } = useEmpleadoStore();
	const { toast } = useToast();
	const onSubmit = async (data: FormData) => {
		const response = await fetch('/api/registrar-empleado', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		const result = await response.json();
		console.log('result', result);
		if (!response.ok) {
			alert('Error: ' + result.error);
			return;
		}

		// Actualiza la lista de empleados después de registrar uno nuevo
		await fetchGetEmpleado();
		// Muestra un mensaje de éxito
		toast({
			title: 'Empleado registrado',
			description: 'El empleado se ha registrado correctamente.',
			action: <ToastAction altText="Deshacer">Deshacer</ToastAction>,
		});

		reset();
		onClose(); // Cierra el modal después de registrar
	};

	useEffect(() => {
		const fetchTiendas = async () => {
			const { data, error } = await supabase
				.from('tiendas')
				.select('id, nombre');
			if (error) {
				console.error('Error al obtener tiendas:', error);
			} else {
				setTiendas(data);
			}
		};
		fetchTiendas();
	}, []);

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
			<div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
				<h2 className="text-2xl font-bold text-center mb-4">
					Registrar Empleado
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid grid-cols-2 gap-4"
				>
					<div>
						<label htmlFor="dni" className="block">
							DNI
						</label>
						<input
							id="dni"
							{...register('dni')}
							placeholder="DNI"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.dni?.message}</p>
					</div>
					<div>
						<label htmlFor="nombres" className="block">
							Nombre
						</label>
						<input
							id="nombres"
							{...register('nombres')}
							placeholder="Nombre"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.nombres?.message}</p>
					</div>
					<div>
						<label htmlFor="apellidos" className="block">
							Apellido
						</label>
						<input
							id="apellidos"
							{...register('apellidos')}
							placeholder="Apellido"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.apellidos?.message}</p>
					</div>
					<div>
						<label htmlFor="correo" className="block">
							Correo
						</label>
						<input
							id="correo"
							{...register('correo')}
							placeholder="Correo"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.correo?.message}</p>
					</div>
					<div>
						<label htmlFor="telefono" className="block">
							Teléfono
						</label>
						<input
							id="telefono"
							{...register('telefono')}
							placeholder="Teléfono"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.telefono?.message}</p>
					</div>
					<div>
						<label htmlFor="direccion" className="block">
							Dirección
						</label>
						<input
							id="direccion"
							{...register('direccion')}
							placeholder="Dirección"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.direccion?.message}</p>
					</div>
					<div>
						<label htmlFor="fecha_nacimiento" className="block">
							Fecha de Nacimiento
						</label>
						<input
							id="fecha_nacimiento"
							{...register('fecha_nacimiento')}
							type="date"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_nacimiento?.message}
						</p>
					</div>
					<div>
						<label htmlFor="fecha_ingreso" className="block">
							Fecha de Ingreso
						</label>
						<input
							id="fecha_ingreso"
							{...register('fecha_ingreso')}
							type="date"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_ingreso?.message}
						</p>
					</div>
					{/* <div>
						<label htmlFor="fecha_salida" className="block">
							Fecha de Salida
						</label>
						<input
							id="fecha_salida"
							{...register('fecha_salida')}
							type="date"
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_salida?.message}
						</p>
					</div> */}
					{/* <div>
						<label htmlFor="estado" className="block">
							Estado
						</label>
						<select
							id="estado"
							{...register('estado')}
							className="w-full p-2 border rounded"
						>
							<option value="">Selecciona un estado</option>
							<option value="true">Activo</option>
							<option value="false">Inactivo</option>
						</select>
						<p className="text-red-500 text-sm">{errors.estado?.message}</p>
					</div> */}
					<div>
						<label htmlFor="tienda_id" className="block">
							Tienda
						</label>
						<select
							id="tienda_id"
							{...register('tienda_id')}
							className="w-full p-2 border rounded"
						>
							<option value="">Selecciona una tienda</option>
							{tiendas.map((tienda) => (
								<option key={tienda.id} value={tienda.id}>
									{tienda.nombre}
								</option>
							))}
						</select>
						<p className="text-red-500 text-sm">{errors.tienda_id?.message}</p>
					</div>
					<div className="col-span-2 flex gap-2">
						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
							disabled={isSubmitting}
						>
							{isSubmitting ? 'Registrando...' : 'Registrar'}
						</button>
						<button
							type="button"
							onClick={onClose}
							className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
