'use client';

import Image from 'next/image';
import React from 'react';
import { useProductStore } from '@/store/useProductStore';

const Productos = () => {
	const { products, fetchProducts } = useProductStore();
	const [currentPage, setCurrentPage] = React.useState(1); // Estado para la página actual
	const [shouldScroll, setShouldScroll] = React.useState(false); // Bandera para controlar el desplazamiento
	const productsPerPage = 8; // Número de productos por página

	React.useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	// Calcula los productos que deben mostrarse en la página actual
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	// Cambia a la página siguiente
	const nextPage = () => {
		if (currentPage < Math.ceil(products.length / productsPerPage)) {
			setCurrentPage(currentPage + 1);
			setShouldScroll(true); // Activa el desplazamiento
		}
	};

	// Cambia a la página anterior
	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			setShouldScroll(true); // Activa el desplazamiento
		}
	};

	// Desplaza al inicio del componente solo si shouldScroll es true
	React.useEffect(() => {
		if (shouldScroll) {
			const productosSection = document.getElementById('productos');
			if (productosSection) {
				productosSection.scrollIntoView({ behavior: 'smooth' });
			}
			setShouldScroll(false); // Restablece la bandera después del desplazamiento
		}
	}, [shouldScroll]);

	return (
		<div id="productos" className="bg-[#D5E8D7] py-[106px] hojas">
			<div className="text-center mb-[55px] font-semibold">
				<h2 className="md:text-[45px] text-[35px]">Nuestros Productos</h2>
				<span className="md:text-[25px] text-[20px]">
					Visitanos y compra tus productos favoritos
				</span>
			</div>
			<div className="flex justify-center items-center gap-4 flex-wrap mt-[77px] max-w-[1200px] mx-auto">
				{currentProducts.map((item) => (
					<div
						key={item.id}
						className="h-[350px] w-[264px] bg-white py-[12px] px-[13px] rounded-[15px]"
					>
						<Image
							height={184}
							width={240}
							src={item.image!}
							alt="imagen de producto"
							className="object-cover h-[184px] rounded-[15px]"
							quality={100}
						/>
						<div className="leading-6 mt-2">
							<p className="text-[16px] text-[#7C7C7C] font-semibold">
								{item.marca}
							</p>
							<p className="text-[22px] text-[#000] font-semibold">
								{item.name}
							</p>
							<p className="text-[16px] text-[#000] font-semibold">
								{item.medida}
							</p>
						</div>
						<div className="flex justify-between mt-4">
							<button className="bg-[#EA0029] text-white text-[26px] w-full rounded-[23px]">
								<span className="text-[18px] mr-2">S/.</span>
								{item.price}
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Controles de paginación */}
			<div className="flex justify-center gap-4 mt-8">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className="bg-[#EA0029] text-white px-4 py-2 rounded-md disabled:opacity-50"
				>
					Anterior
				</button>
				<span className="text-[#000] font-semibold flex items-center">
					Página {currentPage} de {Math.ceil(products.length / productsPerPage)}
				</span>
				<button
					onClick={nextPage}
					disabled={
						currentPage === Math.ceil(products.length / productsPerPage)
					}
					className="bg-[#EA0029] text-white px-4 py-2 rounded-md disabled:opacity-50"
				>
					Siguiente
				</button>
			</div>
		</div>
	);
};

export default Productos;
