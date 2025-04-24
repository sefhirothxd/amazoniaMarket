'use client';

import React, { useEffect, useState } from 'react';
import { icons } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ModalPdf from './CargaPdf';
import EmpleadoForm from './EmpleadoForm';
import TiendasForm from './TiendasForm';
import { useEmpleadoStore } from '@/store/useEmpleadoStore';
import { supabase } from '@/lib/supabase';

const HeaderIntra = () => {
	const pathname = usePathname();
	const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
	const [isModalOpenEmple, setIsModalOpenEmple] = useState(false); // Estado para controlar el modal
	const [isModalOpenTiendas, setIsModalOpenTiendas] = useState(false); // Estado para controlar el modal

	interface Empleado {
		rol?: string; // Define the expected properties of isEmpleado
		nombres?: string;
		cargo?: {
			nombre?: string; // Define the expected structure of the cargo property
		} | null;
	}

	const [isEmpleado, setIsEmpleado] = useState<Empleado>({}); // Estado para controlar el modal

	//obtener informacion del empleado
	const { fetchGetEmpleadoDni } = useEmpleadoStore();

	// Función para abrir el modal
	const openModal = () => {
		setIsModalOpen(true);
	};
	const openModalEmp = () => {
		setIsModalOpenEmple(true);
	};
	const openModalTiendas = () => {
		setIsModalOpenTiendas(true);
	};

	// Función para cerrar el modal
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const closeModalEmp = () => {
		setIsModalOpenEmple(false);
	};
	const closeModalTiendas = () => {
		setIsModalOpenTiendas(false);
	};

	const fetchData = async () => {
		const { data: sessionData } = await supabase.auth.getSession();
		const userId = sessionData?.session?.user.id;

		// Aquí puedes realizar la llamada a la API o cualquier otra lógica necesaria
		if (userId) {
			const res = await fetchGetEmpleadoDni(userId);
			console.log('Empleado:', res?.[0] ?? 'No empleado data available');
			setIsEmpleado(res?.[0] ?? {}); // Guardar el empleado en el estado
		} else {
			console.error('No hay userId disponible');
		} // Updated to match the function signature

		// console.log('res', res);
	};

	useEffect(() => {
		fetchData();
	}, []); // Se ejecuta una vez al montar el componente

	return (
		<div
			className={
				pathname === '/intranet/boletas' ||
				pathname === '/intranet/empleados' ||
				pathname === '/intranet/tiendas'
					? 'flex justify-between w-full gap-[24px] items-center'
					: 'flex justify-end w-full gap-[24px] items-center'
			}
		>
			{pathname === '/intranet/boletas' && (
				<>
					<div>
						<button
							onClick={openModal} // Abre el modal al hacer clic
							className="bg-[#EA0029] text-white rounded-xl p-2 px-5 flex items-center gap-1 text-[18px]"
						>
							<icons.Plus size={24} />
							Añadir
						</button>
					</div>
					{/* <div>
                        <input
                            type="text"
                            className="border-2 border-[#E5E5E5] rounded-xl p-2 px-5 md:w-[400px] w-[600px] min-w-[200px] text-[18px]"
                            placeholder="Buscar"
                        />
                    </div> */}
				</>
			)}
			{pathname === '/intranet/empleados' && (
				<>
					<div>
						<button
							onClick={openModalEmp} // Abre el modal al hacer clic
							className="bg-[#EA0029] text-white rounded-xl p-2 px-5 flex items-center gap-1 text-[18px]"
						>
							<icons.Plus size={24} />
							Añadir
						</button>
					</div>
					{/* <div>
                        <input
                            type="text"
                            className="border-2 border-[#E5E5E5] rounded-xl p-2 px-5 md:w-[400px] w-[600px] min-w-[200px] text-[18px]"
                            placeholder="Buscar"
                        />
                    </div> */}
				</>
			)}
			{pathname === '/intranet/tiendas' && (
				<>
					<div>
						<button
							onClick={openModalTiendas} // Abre el modal al hacer clic
							className="bg-[#EA0029] text-white rounded-xl p-2 px-5 flex items-center gap-1 text-[18px]"
						>
							<icons.Plus size={24} />
							Añadir
						</button>
					</div>
					{/* <div>
						<input
							type="text"
							className="border-2 border-[#E5E5E5] rounded-xl p-2 px-5 md:w-[400px] w-[600px] min-w-[200px] text-[18px]"
							placeholder="Buscar"
						/>
					</div> */}
				</>
			)}

			{/* Renderiza el nombre y la foto del empleado */}

			<div className="flex items-center gap-4">
				<div className="flex flex-col items-end gap-0">
					<p className="text-[22px] font-semibold capitalize">
						Hola👋 {isEmpleado?.nombres}
					</p>
					<small className="font-semibold text-[18px] text-[#949494] capitalize">
						{isEmpleado?.cargo?.nombre}
					</small>
				</div>
				<div className="bg-black w-[50px] h-[50px] rounded-full flex items-center justify-center">
					<p className="text-white text-[18px] uppercase">
						{isEmpleado?.nombres?.charAt(0)}
					</p>
				</div>
			</div>

			{/* Renderiza el modal si isModalOpen es true */}
			{isModalOpen && <ModalPdf onClose={closeModal} />}
			{isModalOpenEmple && <EmpleadoForm onClose={closeModalEmp} />}
			{/* tiendas */}
			{isModalOpenTiendas && <TiendasForm onClose={closeModalTiendas} />}
		</div>
	);
};

export default HeaderIntra;
