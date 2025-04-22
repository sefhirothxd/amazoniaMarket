// app/api/upload-contrato/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
	try {
		console.log('Subiendo contrato...');
		const formData = await req.formData();
		const file = formData.get('contrato') as File;
		const dni = formData.get('dni') as string;

		if (!file || !dni) {
			return NextResponse.json(
				{ error: 'Archivo o DNI faltante' },
				{ status: 400 }
			);
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		// Crear carpeta si no existe
		const dir = path.join(process.cwd(), 'public', 'contratos');
		await fs.mkdir(dir, { recursive: true });

		// Guardar como 12345678.pdf
		const filename = `${dni}.pdf`;
		const filepath = path.join(dir, filename);
		await fs.writeFile(filepath, buffer);

		const fileUrl = `/contratos/${filename}`;

		// Actualizar la tabla empleados con la URL
		const { error } = await supabase
			.from('empleados')
			.update({ contrato_url: fileUrl })
			.eq('dni', dni);

		if (error) {
			console.error(
				'Error actualizando contrato_url en empleados:',
				error.message
			);
			return NextResponse.json(
				{ error: 'Error actualizando el empleado' },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true, fileUrl });
	} catch (err) {
		console.error('Error en upload-contrato:', err);
		return NextResponse.json(
			{ error: 'Error al subir contrato' },
			{ status: 500 }
		);
	}
}
