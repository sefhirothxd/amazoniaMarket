import { supabase } from '@/lib/supabase';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
	const formData = await req.formData();

	const dni = formData.get('dni') as string;
	const contratoFile = formData.get('contrato_url') as File | null;

	console.log('fromdata:', formData);

	const campos = {
		nombres: formData.get('nombres'),
		apellidos: formData.get('apellidos'),
		correo: formData.get('correo'),
		telefono: formData.get('telefono'),
		direccion: formData.get('direccion'),
		fecha_nacimiento: formData.get('fecha_nacimiento'),
		fecha_ingreso: formData.get('fecha_ingreso'),
		fecha_salida: formData.get('fecha_salida'),
		fecha_renovacion: formData.get('fecha_renovacion'),
	};

	let contrato_url: string | null = formData.get('contrato_url') as
		| string
		| null; // Mantener el valor existente

	if (contratoFile instanceof File) {
		// Solo procesar el archivo si se ha subido uno nuevo
		const buffer = Buffer.from(await contratoFile.arrayBuffer());
		const fileName = `${dni}.pdf`;
		const filePath = path.join(process.cwd(), 'public/contratos', fileName);

		// Reemplazar archivo anterior si existe
		try {
			await unlink(filePath); // eliminar el anterior si existe
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			// no hacer nada si no existe
		}

		await writeFile(filePath, buffer);
		contrato_url = `/contratos/${fileName}`;
	}

	const updateData: Record<string, unknown> = {
		...campos,
	};

	if (contrato_url) {
		updateData.contrato_url = contrato_url;
	}

	const { error } = await supabase
		.from('empleados')
		.update(updateData)
		.eq('dni', dni);

	if (error) {
		console.error('Error actualizando empleado:', error.message);
		return new Response('Error al actualizar empleado', { status: 500 });
	}

	return new Response('Empleado actualizado correctamente', { status: 200 });
}
