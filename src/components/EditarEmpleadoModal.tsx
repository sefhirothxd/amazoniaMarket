'use client';
import { Empleado } from '@/app/intranet/empleados/columns';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { FormEvent, useEffect, useState } from 'react';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { supabase } from '@/lib/supabase';

interface Cargo {
	id: number;
	nombre: string;
}

interface Props {
	open: boolean;
	onClose: () => void;
	empleado: Empleado | null;
	onSave: (empleadoActualizado: Empleado) => void;
}

export function EditarEmpleadoModal({
	open,
	onClose,
	empleado,
	onSave,
}: Props) {
	const [form, setForm] = useState<Empleado | null>(empleado);
	const [cargos, setCargos] = useState<Cargo[]>([]);
	const { fetchGetEmpleado } = useEmpleadoStore();

	useEffect(() => {
		setForm(empleado);
		const obtenerCargos = async () => {
			const { data, error } = await supabase.from('cargo').select('id, nombre');

			if (error) {
				console.error('Error al obtener cargos:', error);
				return;
			}

			if (data) {
				setCargos(data as Cargo[]);
			}
		};

		obtenerCargos();
	}, [empleado]);

	if (!form) return null;

	const handleChange = (
		key: keyof Empleado,
		value: string | boolean | File | null | Cargo // Permitir objeto Cargo
	) => {
		setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
	};

	const handleCargoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCargoId = event.target.value;
		const selectedCargo = cargos.find(
			(cargo) => cargo.id === parseInt(selectedCargoId)
		);
		handleChange('cargo', selectedCargo || null);
		// También actualizamos directamente el cargo_id en el form para el envío
		// ignore ts
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		setForm((prev) =>
			prev
				? {
						...prev,
						cargo_id: selectedCargoId || '', // Ensure cargo_id is a string
				  }
				: prev
		);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!form) return;

		const formData = new FormData();
		for (const key of Object.keys(form) as (keyof Empleado)[]) {
			if (form[key] !== null) {
				if (
					key === 'cargo' &&
					typeof form[key] === 'object' &&
					form[key] !== null
				) {
					formData.append(
						'cargo_id',
						(form[key] as Cargo).id?.toString() || ''
					);
					formData.append('cargo_nombre', (form[key] as Cargo).nombre || '');
				} else if (key === 'cargo_id') {
					formData.append(key, form[key]?.toString() || '');
				} else {
					formData.append(key, form[key] as string | Blob);
				}
			}
		}

		await fetch('/api/editar-empleado', {
			method: 'POST',
			body: formData,
		});
		await fetchGetEmpleado();
		onSave(form);
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Editar Empleado</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={handleSubmit}
					className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2"
				>
					{[
						{ label: 'Nombres', key: 'nombres' },
						{ label: 'Apellidos', key: 'apellidos' },
						{ label: 'Correo', key: 'correo', type: 'email' },
						{ label: 'DNI', key: 'dni' },
						{ label: 'Teléfono', key: 'telefono' },
						{ label: 'Dirección', key: 'direccion' },
						{
							label: 'Fecha de Nacimiento',
							key: 'fecha_nacimiento',
							type: 'date',
						},
						{ label: 'Fecha de Ingreso', key: 'fecha_ingreso', type: 'date' },
						{ label: 'Fecha de Salida', key: 'fecha_salida', type: 'date' },
						{
							label: 'Fecha de Renovación',
							key: 'fecha_renovacion',
							type: 'date',
						},
					].map(({ label, key, type }) => (
						<div key={key} className="flex flex-col gap-1">
							<label className="font-medium text-sm text-gray-700">
								{label}
							</label>
							<input
								type={type || 'text'}
								value={(form[key as keyof Empleado] as string) ?? ''}
								onChange={(e) =>
									handleChange(
										key as keyof Empleado,
										e.target.value === '' ? null : e.target.value
									)
								}
								className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					))}

					<div key="cargo" className="flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">Cargo</label>
						<select
							value={form.cargo_id?.toString() || ''}
							onChange={handleCargoChange}
							className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="">Seleccionar Cargo</option>
							{cargos.map((c) => (
								<option key={c.id} value={c.id}>
									{c.nombre}
								</option>
							))}
						</select>
					</div>

					<div className="col-span-2 flex flex-col gap-1">
						<label className="font-medium text-sm text-gray-700">
							Contrato PDF
						</label>
						<input
							type="file"
							accept=".pdf"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
									handleChange('contrato_url', file);
								}
							}}
							className="border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
						/>
					</div>

					<div className="col-span-2 flex justify-end mt-4">
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold"
						>
							Guardar cambios
						</button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
