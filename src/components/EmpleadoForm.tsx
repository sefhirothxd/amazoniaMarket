'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const schema = yup.object().shape({
	dni: yup.string().length(8, 'Debe tener 8 dígitos').required(),
	nombres: yup.string().min(3).required(),
	apellidos: yup.string().min(3).required(),
	correo: yup.string().email().required(),
	telefono: yup
		.string()
		.matches(/^\d{9}$/, 'Debe tener 9 dígitos')
		.required(),
	direccion: yup.string().min(3).required(),
	fecha_nacimiento: yup.date().required(),
	fecha_ingreso: yup.date().required(),
	cargo_id: yup.string().required(),
	fecha_renovacion: yup.date().nullable(),
	tienda_id: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

interface Props {
	onClose: () => void;
}

export default function RegistrarEmpleado({ onClose }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	});

	const [tiendas, setTiendas] = useState<{ id: string; nombre: string }[]>([]);
	const [cargos, setCargos] = useState<{ id: string; nombre: string }[]>([]);
	const { fetchGetEmpleado } = useEmpleadoStore();
	const { toast } = useToast();

	useEffect(() => {
		const obtenerData = async () => {
			const { data: tiendasData } = await supabase
				.from('tiendas')
				.select('id, nombre');
			const { data: cargosData } = await supabase
				.from('cargo')
				.select('id, nombre');
			if (tiendasData) setTiendas(tiendasData);
			if (cargosData) setCargos(cargosData);
		};
		obtenerData();
	}, []);

	const onSubmit = async (data: FormData) => {
		try {
			// 1. Guardar empleado sin contrato_url
			const res = await fetch('/api/registrar-empleado', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...data, contrato_url: '' }),
			});

			if (!res.ok || res.status === 400) {
				const errorResponse = await res.json();

				toast({
					title: 'Empleado no registrado',
					description: errorResponse.error || 'Error al registrar empleado',
					action: <ToastAction altText="Ok">Cerrar</ToastAction>,
				});
				return;
			}

			// 2. Si se subió un contrato, ahora lo mandamos usando el DNI
			const fileInput = document.getElementById(
				'contrato-file'
			) as HTMLInputElement;
			const file = fileInput?.files?.[0];

			if (file) {
				const formData = new FormData();
				formData.append('contrato', file);
				formData.append('dni', data.dni);

				const contratoRes = await fetch('/api/upload-contrato', {
					method: 'POST',
					body: formData,
				});

				console.log('contratoRes', contratoRes);

				if (!contratoRes.ok) {
					alert('Empleado registrado, pero hubo un error subiendo el contrato');
					return;
				}
			}

			await fetchGetEmpleado();
			toast({
				title: 'Empleado registrado',
				description: 'El empleado fue registrado exitosamente',
				action: <ToastAction altText="Ok">Cerrar</ToastAction>,
			});

			reset();
			onClose();
		} catch (error) {
			console.error(error);
			alert('Ocurrió un error inesperado.');
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
			<div className="bg-white rounded-xl shadow-md p-6 w-full max-w-3xl">
				<h2 className="text-xl font-bold mb-4 text-center">
					Registrar Empleado
				</h2>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className="grid grid-cols-2 gap-4"
				>
					<div>
						<label>DNI</label>
						<input
							type="text"
							{...register('dni')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.dni?.message}</p>
					</div>

					<div>
						<label>Nombres</label>
						<input
							type="text"
							{...register('nombres')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.nombres?.message}</p>
					</div>

					<div>
						<label>Apellidos</label>
						<input
							type="text"
							{...register('apellidos')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.apellidos?.message}</p>
					</div>

					<div>
						<label>Correo</label>
						<input
							type="email"
							{...register('correo')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.correo?.message}</p>
					</div>

					<div>
						<label>Teléfono</label>
						<input
							type="text"
							{...register('telefono')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.telefono?.message}</p>
					</div>

					<div>
						<label>Dirección</label>
						<input
							type="text"
							{...register('direccion')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">{errors.direccion?.message}</p>
					</div>

					<div>
						<label>Fecha de nacimiento</label>
						<input
							type="date"
							{...register('fecha_nacimiento')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_nacimiento?.message}
						</p>
					</div>

					<div>
						<label>Fecha de ingreso</label>
						<input
							type="date"
							{...register('fecha_ingreso')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_ingreso?.message}
						</p>
					</div>
					<div>
						<label>Cargo</label>
						<select
							{...register('cargo_id')}
							className="w-full p-2 border rounded"
						>
							<option value="">Selecciona un cargo</option>
							{cargos.map((c) => (
								<option key={c.id} value={c.id}>
									{c.nombre}
								</option>
							))}
						</select>
						<p className="text-red-500 text-sm">{errors.cargo_id?.message}</p>
					</div>

					<div>
						<label>Fecha de renovación</label>
						<input
							type="date"
							{...register('fecha_renovacion')}
							className="w-full p-2 border rounded"
						/>
						<p className="text-red-500 text-sm">
							{errors.fecha_renovacion?.message}
						</p>
					</div>

					<div>
						<label
							className="block text-sm font-medium mb-1"
							htmlFor="contrato-file"
						>
							Contrato (PDF)
						</label>
						<input
							type="file"
							id="contrato-file"
							accept="application/pdf"
							className="w-full border rounded px-3 py-2"
						/>
					</div>

					<div>
						<label>Tienda</label>
						<select
							{...register('tienda_id')}
							className="w-full p-2 border rounded"
						>
							<option value="">Selecciona una tienda</option>
							{tiendas.map((t) => (
								<option key={t.id} value={t.id}>
									{t.nombre}
								</option>
							))}
						</select>
						<p className="text-red-500 text-sm">{errors.tienda_id?.message}</p>
					</div>

					<div className="col-span-2 flex justify-end gap-3 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 bg-gray-500 text-white rounded"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isSubmitting}
							className="px-4 py-2 bg-blue-600 text-white rounded"
						>
							{isSubmitting ? 'Registrando...' : 'Registrar'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
