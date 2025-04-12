import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

const uploadDir = path.join(process.cwd(), 'public/pdfs');

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const files = formData.getAll('files') as File[];

		if (!files.length) {
			return NextResponse.json(
				{ error: 'No se subieron archivos' },
				{ status: 400 }
			);
		}

		function extraerDatos(cadena: string) {
			const regex = /_(\d{4})(\d{2})_.*_(\d{8})_/;
			const match = cadena.match(regex);

			if (match) {
				const anio = match[1];
				const mes = match[2];
				const dni = match[3];
				return { dni, anio, mes };
			} else {
				return { error: 'Formato no válido' };
			}
		}

		await fs.mkdir(uploadDir, { recursive: true });

		const uploadedFiles = [];

		for (const file of files) {
			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const filePath = path.join(uploadDir, file.name);

			const { dni, anio, mes, error } = extraerDatos(file.name);
			if (error) continue;

			// Buscar el empleado por DNI
			const { data: empleado, error: empleadoError } = await supabase
				.from('empleados')
				.select('id')
				.eq('dni', dni)
				.single();

			if (empleadoError || !empleado) {
				console.warn(`Empleado con DNI ${dni} no encontrado`);
				continue;
			}

			const ruta_pdf = `/pdfs/${file.name}`;

			// Guardar en Supabase (tabla boleta)
			const { error: insertError } = await supabase
				.from('boletas_pago')
				.insert({
					empleado_id: empleado.id,
					ruta_pdf,
					anio: parseInt(anio ?? '0'),
					mes: parseInt(mes ?? '0'),
				});

			if (insertError) {
				console.error(
					`Error al guardar boleta en Supabase para ${file.name}:`,
					insertError
				);
				continue;
			}

			// Guardar el archivo en el disco
			await fs.writeFile(filePath, buffer);

			uploadedFiles.push({
				archivo: ruta_pdf,
				empleado_id: empleado.id,
				anio,
				mes,
			});
		}

		return NextResponse.json({ success: true, files: uploadedFiles });
	} catch (error) {
		console.error('Error al guardar archivos:', error);
		return NextResponse.json(
			{ error: 'Error al guardar los archivos' },
			{ status: 500 }
		);
	}
}
