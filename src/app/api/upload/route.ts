import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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
				const año = match[1]; // Año (4 dígitos)
				const mes = match[2]; // Mes (2 dígitos)
				const dni = match[3]; // DNI (8 dígitos)

				return { dni, año, mes };
			} else {
				return { error: 'Formato no válido' };
			}
		}

		const uploadDir = path.join(process.cwd(), 'public/pdfs');
		await fs.mkdir(uploadDir, { recursive: true });

		const uploadedFiles = [];
		const pdfsUploaded = [];

		for (const file of files) {
			const bytes = await file.arrayBuffer();
			const buffer = Buffer.from(bytes);
			const filePath = path.join(uploadDir, file.name);

			const cadena = file.name;
			const extraName = extraerDatos(cadena);
			const { dni, año, mes } = extraName;
			pdfsUploaded.push({ dni, año, mes, ruta_pdf: `/pdfs/${file.name}` });

			await fs.writeFile(filePath, buffer);

			uploadedFiles.push(`/pdfs/${file.name}`);
		}

		console.log('pdfsUploaded:', pdfsUploaded);

		return NextResponse.json({ success: true, files: uploadedFiles });
	} catch (error) {
		console.error('Error al guardar archivos:', error);
		return NextResponse.json(
			{ error: 'Error al guardar los archivos' },
			{ status: 500 }
		);
	}
}

export async function GET(req: NextRequest) {
	try {
		const searchParams = new URL(req.url).searchParams;
		const dni = searchParams.get('dni');

		// Obtener todos los archivos en la carpeta
		const files = await fs.readdir(uploadDir);
		let pdfFiles = files.map((file) => `/pdfs/${file}`);

		// Filtrar por DNI si se proporciona
		if (dni) {
			pdfFiles = pdfFiles.filter((file) => file.includes(dni));
		}

		return NextResponse.json({ success: true, files: pdfFiles });
	} catch (error) {
		console.error('Error al obtener archivos:', error);
		return NextResponse.json(
			{ error: 'Error al obtener los archivos' },
			{ status: 500 }
		);
	}
}
