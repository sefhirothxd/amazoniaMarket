'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function MovilidadDiasPage() {
	const params = useParams();
	const mesId = params.id as string;

	interface Dia {
		id: number;
		dia: number;
		destino?: string;
		motivo?: string;
		monto?: number | null;
	}

	const [dias, setDias] = useState<Dia[]>([]);
	const [mes, setMes] = useState<Mes | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedDia, setSelectedDia] = useState<Dia | null>(null);
	const [destino, setDestino] = useState('');
	const [motivo, setMotivo] = useState('');
	const [monto, setMonto] = useState<number | null>(null);

	interface Mes {
		id: number;
		mes: number;
		anio: number;
		empleados: {
			id: number;
			nombres: string;
			apellidos: string;
			dni: string;
		};
	}

	useEffect(() => {
		const fetchData = async () => {
			const { data: mesData } = await supabase
				.from('movilidad_mes')
				.select('*, empleados(id, nombres, apellidos, dni)')
				.eq('id', mesId)
				.single();

			setMes(mesData);

			const { data: diasData } = await supabase
				.from('movilidad_dia')
				.select('*')
				.eq('mes_id', mesId)
				.order('dia');

			setDias(diasData || []);
		};

		fetchData();
	}, [mesId]);

	const handleEdit = (dia: Dia) => {
		setSelectedDia(dia);
		setDestino(dia.destino || '');
		setMotivo(dia.motivo || '');
		setMonto(dia.monto || null);
		setShowModal(true);
	};

	const handleSave = async () => {
		if (!selectedDia) return;

		await supabase
			.from('movilidad_dia')
			.update({
				destino,
				motivo,
				monto,
			})
			.eq('id', selectedDia.id);

		// Actualizar el estado local después de guardar
		setDias((prevDias) =>
			prevDias.map((dia) =>
				dia.id === selectedDia.id ? { ...dia, destino, motivo, monto } : dia
			)
		);

		setShowModal(false);
	};

	const generatePDF = () => {
		if (!mes) return;

		const doc = new jsPDF();

		// Configuración de márgenes
		const margin = 15;
		const pageWidth = doc.internal.pageSize.width;
		const pageHeight = doc.internal.pageSize.height;

		// Añadir razón social y nombre de la empresa en dos columnas
		doc.setFontSize(14);
		doc.text('CAMU MARKET', margin, margin);
		doc.setFontSize(10);
		doc.text('RUC: 20612672335', margin, margin + 7);

		// Espacio entre los datos de la empresa y los del empleado
		doc.setFontSize(12);
		doc.text('Información del Empleado', margin + 100, margin);
		doc.text(
			`Empleado: ${mes.empleados.nombres} ${mes.empleados.apellidos}`,
			margin + 100,
			margin + 7
		);
		doc.text(`DNI: ${mes.empleados.dni}`, margin + 100, margin + 14);

		// Añadir fecha y hora de emisión
		const date = new Date();
		doc.text(
			`Fecha de Emisión: ${date.toLocaleDateString()}`,
			margin,
			margin + 21
		);
		doc.text(
			`Hora de Emisión: ${date.toLocaleTimeString()}`,
			margin,
			margin + 28
		);

		// Título de la tabla de gastos
		doc.setFontSize(16);
		doc.text('Detalle de Gastos de Movilidad', margin, margin + 40);

		// Crear tabla con encabezados
		const tableColumnWidths = [20, 60, 60, 40]; // Ancho de las columnas (Día, Destino, Motivo, Monto)
		const startY = margin + 50; // Inicio de la tabla en la página
		let currentY = startY;

		// Encabezados de la tabla
		doc.setFontSize(10);
		doc.text('Día', margin, currentY);
		doc.text('Destino', margin + tableColumnWidths[0], currentY);
		doc.text(
			'Motivo',
			margin + tableColumnWidths[0] + tableColumnWidths[1],
			currentY
		);
		doc.text(
			'Monto (S/)',
			margin +
				tableColumnWidths[0] +
				tableColumnWidths[1] +
				tableColumnWidths[2],
			currentY
		);
		currentY += 7;

		// Dibujar las filas de la tabla
		dias.forEach((dia) => {
			doc.text(`${dia.dia}`, margin, currentY);
			doc.text(
				`${dia.destino || '-'}`,
				margin + tableColumnWidths[0],
				currentY
			);
			doc.text(
				`${dia.motivo || '-'}`,
				margin + tableColumnWidths[0] + tableColumnWidths[1],
				currentY
			);
			doc.text(
				`${dia.monto ?? '-'}`,
				margin +
					tableColumnWidths[0] +
					tableColumnWidths[1] +
					tableColumnWidths[2],
				currentY
			);
			currentY += 7;
		});

		// Total gastado
		const totalGastado = dias.reduce((acc, dia) => acc + (dia.monto || 0), 0);
		doc.setFontSize(12);
		doc.text(
			`Total Gastado: S/ ${totalGastado.toFixed(2)}`,
			margin,
			currentY + 10
		);

		// Línea para la firma
		const signatureLineY = currentY + 20;
		doc.line(margin, signatureLineY, pageWidth - margin, signatureLineY);
		doc.text('Firma del Empleado', margin + 10, signatureLineY + 5);
		doc.text(
			`${mes.empleados.nombres} ${mes.empleados.apellidos}`,
			margin + 100,
			signatureLineY + 5
		);

		// Ajuste de la página
		doc.setFontSize(10);
		doc.text('Página 1', pageWidth - 30, pageHeight - 10);

		// Guardar el archivo PDF
		doc.save('gastos_movilidad.pdf');
	};

	return (
		<div className="p-6">
			{mes && (
				<div className="mb-4">
					<h2 className="text-xl font-bold">
						Movilidad - {nombreMes(mes.mes)} {mes.anio}
					</h2>
					<p>
						Empleado: {mes.empleados.nombres} {mes.empleados.apellidos} (
						{mes.empleados.dni})
					</p>
				</div>
			)}

			{/* Botón para generar PDF */}
			<button
				onClick={generatePDF}
				className="bg-green-500 text-white p-2 rounded mb-4"
			>
				Generar PDF
			</button>

			<table className="w-full text-left mt-4 border-gray-400 border rounded-[25px] shadow-md overflow-hidden">
				<thead>
					<tr className="bg-black text-white ">
						<th className="p-2  pl-8 pt-4">Día</th>
						<th className="p-2 ">Destino</th>
						<th className="p-2 ">Motivo</th>
						<th className="p-2 ">Monto</th>
						<th className="p-2 ">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{dias.map((d) => (
						<tr key={d.id}>
							<td className="p-2 border-gray-400 border-y py-4">{d.dia}</td>
							<td className="p-2 border-gray-400 border-y py-4 ">
								{d.destino || '-'}
							</td>
							<td className="p-2 border-gray-400 border-y py-4 ">
								{d.motivo || '-'}
							</td>
							<td className="p-2 border-gray-400 border-y py-4 ">
								{d.monto ?? '-'}
							</td>
							<td className="p-2 border-gray-400 border-y py-4 ">
								<button
									onClick={() => handleEdit(d)}
									className="text-blue-500 hover:underline"
								>
									Editar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modal */}
			{showModal && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded shadow-lg w-96">
						<h3 className="text-xl font-bold mb-4">Editar Día de Movilidad</h3>
						<div>
							<label className="block mb-2">Destino</label>
							<input
								type="text"
								className="w-full p-2 border rounded mb-4"
								value={destino}
								onChange={(e) => setDestino(e.target.value)}
							/>
						</div>
						<div>
							<label className="block mb-2">Motivo</label>
							<input
								type="text"
								className="w-full p-2 border rounded mb-4"
								value={motivo}
								onChange={(e) => setMotivo(e.target.value)}
							/>
						</div>
						<div>
							<label className="block mb-2">Monto</label>
							<input
								type="number"
								className="w-full p-2 border rounded mb-4"
								value={monto || ''}
								onChange={(e) => setMonto(Number(e.target.value))}
							/>
						</div>
						<div className="flex justify-end">
							<button
								onClick={handleSave}
								className="bg-blue-500 text-white p-2 rounded mr-2"
							>
								Guardar
							</button>
							<button
								onClick={() => setShowModal(false)}
								className="bg-gray-300 p-2 rounded"
							>
								Cerrar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function nombreMes(mes: number): string {
	const meses = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	];
	return meses[mes - 1];
}
