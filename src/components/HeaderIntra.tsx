'use client';

import React, { useState } from 'react';
import { icons } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ModalPdf from './CargaPdf';
import EmpleadoForm from './EmpleadoForm';

const HeaderIntra = () => {
	const pathname = usePathname();
	const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
	const [isModalOpenEmple, setIsModalOpenEmple] = useState(false); // Estado para controlar el modal

	// Función para abrir el modal
	const openModal = () => {
		setIsModalOpen(true);
	};
	const openModalEmp = () => {
		setIsModalOpenEmple(true);
	};

	// Función para cerrar el modal
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const closeModalEmp = () => {
		setIsModalOpenEmple(false);
	};

	return (
		<div
			className={
				pathname === '/intranet/boletas' || pathname === '/intranet/empleados'
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

			<div className="flex items-center gap-4">
				<div className="flex flex-col items-end gap-0">
					<p className="text-[22px] font-semibold">Hola👋Antonia</p>
					<small className="font-semibold text-[18px] text-[#949494]">
						Administrador
					</small>
				</div>
				<div className="bg-black w-[50px] h-[50px] rounded-full"></div>
			</div>

			{/* Renderiza el modal si isModalOpen es true */}
			{isModalOpen && <ModalPdf onClose={closeModal} />}
			{isModalOpenEmple && <EmpleadoForm onClose={closeModalEmp} />}
		</div>
	);
};

export default HeaderIntra;
