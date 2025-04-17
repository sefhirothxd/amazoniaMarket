'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { jsPDF } from 'jspdf';
import Image from 'next/image';

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

	const generatePDF = (mes: Mes & { dias: Dia[] }) => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();
		const pageHeight = doc.internal.pageSize.getHeight();
		const margin = 15;
		const cellHeight = 8;
		const cellWidths = [30, 100, 30];
		const headers = ['Día', 'Motivo', 'Monto (S/)'];
		let currentY = margin + 50;

		// Fecha y hora de emisión
		const fechaHoraEmision = new Date();
		const fechaStr = fechaHoraEmision.toLocaleDateString();
		const horaStr = fechaHoraEmision.toLocaleTimeString();

		// Encabezado general
		const drawHeader = () => {
			doc.setFontSize(16);
			doc.setFont('helvetica', 'bold');
			doc.text('CAMU MARKET', pageWidth / 2, margin, { align: 'center' });

			doc.setFontSize(10);
			doc.text('RUC: 20612672335', pageWidth / 2, margin + 6, {
				align: 'center',
			});

			doc.setFontSize(8);
			doc.text(
				`Emitido: ${fechaStr} ${horaStr}`,
				pageWidth - margin,
				margin + 6,
				{ align: 'right' }
			);

			doc.setLineWidth(0.5);
			doc.line(margin, margin + 12, pageWidth - margin, margin + 12);

			doc.setFontSize(14);
			doc.setFont('helvetica', 'bold');
			doc.text('INFORME DE GASTOS DE MOVILIDAD', pageWidth / 2, margin + 20, {
				align: 'center',
			});

			// Datos del trabajador (completos en una sola sección)
			const infoStartY = margin + 35;
			doc.setFontSize(12);
			doc.setFont('helvetica', 'normal');
			doc.text(
				`Nombres: ${mes.empleados.nombres} ${mes.empleados.apellidos}`,
				margin,
				infoStartY
			);
			doc.text(`DNI: ${mes.empleados.dni}`, margin, infoStartY + 6);
			// doc.text(`Cargo: ${mes.empleados.cargo}`, margin, infoStartY + 12);
			// doc.text(
			// 	`Tienda: ${mes.empleados.tienda.nombre}`,
			// 	margin,
			// 	infoStartY + 18
			// );
			doc.text(
				`Mes: ${nombreMes(mes.mes)} ${mes.anio}`,
				margin,
				infoStartY + 24
			);

			// Cabecera tabla
			currentY = infoStartY + 35;
			doc.setFont('helvetica', 'bold');
			doc.setFontSize(10);
			doc.setFillColor(220, 220, 220);
			doc.rect(margin, currentY - 5, pageWidth - margin * 2, cellHeight, 'F');

			let x = margin;
			headers.forEach((header, i) => {
				doc.text(header, x + 2, currentY);
				x += cellWidths[i];
			});

			currentY += cellHeight;
		};

		drawHeader();

		doc.setFont('helvetica', 'normal');
		mes.dias.forEach((dia: Dia) => {
			if (currentY + cellHeight > pageHeight - 40) {
				doc.addPage();
				drawHeader();
			}

			let x = margin;
			const row = [
				String(dia.dia),
				dia.motivo || '',
				(dia.monto ?? 0).toFixed(2),
			];
			row.forEach((cell, i) => {
				doc.text(cell, x + 2, currentY);
				x += cellWidths[i];
			});
			currentY += cellHeight;
		});

		const total = mes.dias.reduce(
			(acc: number, dia: Dia) => acc + (dia.monto ?? 0),
			0
		);

		if (currentY + 30 > pageHeight - 40) {
			doc.addPage();
			drawHeader();
		}

		doc.setFont('helvetica', 'bold');
		doc.text(`Total: S/ ${total.toFixed(2)}`, margin, currentY + 10);

		// Firma (más corta) + datos completos del trabajador
		const signatureLineY = currentY + 30;
		const lineWidth = 60;
		doc.line(margin, signatureLineY, margin + lineWidth, signatureLineY);
		doc.setFontSize(10);
		doc.setFont('helvetica', 'normal');

		// Datos bajo la firma
		const datosFirmaY = signatureLineY + 5;
		doc.setFontSize(9);
		doc.text(
			`Nombres: ${mes.empleados.nombres} ${mes.empleados.apellidos}`,
			margin,
			datosFirmaY
		);
		doc.text(`DNI: ${mes.empleados.dni}`, margin, datosFirmaY + 5);
		// doc.text(`Cargo: ${mes.empleados.cargo}`, margin, datosFirmaY + 10);
		// doc.text(
		// 	`Tienda: ${mes.empleados.tienda.nombre}`,
		// 	margin,
		// 	datosFirmaY + 15
		// );

		// Número de página
		const totalPages = doc.getNumberOfPages();
		for (let i = 1; i <= totalPages; i++) {
			doc.setPage(i);
			doc.setFontSize(10);
			doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, {
				align: 'center',
			});
		}

		doc.save(
			`movilidad_${mes.empleados.nombres}_${nombreMes(mes.mes)}_${mes.anio}.pdf`
		);
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			{mes && (
				<div className="mb-4">
					<h2 className="text-xl font-bold">
						Movilidad - {nombreMes(mes.mes)} {mes.anio}
					</h2>
					<p className="capitalize">
						Empleado: {mes.empleados.nombres} {mes.empleados.apellidos} (
						{mes.empleados.dni})
					</p>
				</div>
			)}

			{/* Botón para generar PDF */}
			<button
				onClick={() => mes && generatePDF({ ...mes, dias })}
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
									className="bg-[#27BE4F] hover:underline p-2 flex items-center justify-center rounded-lg"
								>
									{/* //btn edit */}
									<figure>
										<Image
											src="/edit.svg"
											alt="boton editar"
											width={18}
											height={18}
											className=""
										/>
									</figure>
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
						<div className="flex justify-end gap-2">
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
