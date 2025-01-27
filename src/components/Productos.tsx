'use client';

import Image from 'next/image';
import React from 'react';

import { useProductStore } from '@/store/useProductStore';

const Productos = () => {
	const { products, fetchProducts } = useProductStore();

	React.useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div className="bg-[#D5E8D7] py-[106px]">
			<div className="text-center  mb-[55px] font-semibold">
				<h2 className="md:text-[45px] text-[35px] ">Nuestros Productos</h2>
				<span className="md:text-[25px] text-[20px] ">
					Visitanos y compra tus productos favoritos
				</span>
			</div>
			<div className="flex justify-center items-center gap-[21px] flex-wrap md:flex-nowrap">
				<div className="bg-white py-[19px] px-[8] rounded-[20px] w-[210px] h-[58px] flex justify-center">
					<Image
						height={50}
						width={180}
						src="/todo.svg"
						alt=""
						className=" object-cover w-[60px]"
					/>
				</div>
				<div className="bg-white py-[19px] px-[8] rounded-[20px] w-[210px] h-[58px] flex justify-center">
					<Image
						height={50}
						width={180}
						src="/maldonado.svg"
						alt=""
						className=" object-cover"
					/>
				</div>
				<div className="bg-white py-[19px] px-[8] rounded-[20px] w-[210px] h-[58px] flex justify-center">
					<Image
						height={50}
						width={100}
						src="/iquitos.svg"
						alt=""
						className=" object-cover"
					/>
				</div>
				<div className="bg-white py-[19px] px-[8] rounded-[20px] w-[210px] h-[58px] flex justify-center">
					<Image
						height={50}
						width={100}
						src="/tarapoto.svg"
						alt=""
						className=" object-cover"
					/>
				</div>
				<div className="bg-white py-[19px] px-[8] rounded-[20px] w-[210px] h-[58px] flex justify-center">
					<Image
						height={50}
						width={100}
						src="pucallpa.svg"
						alt=""
						className=" object-cover"
					/>
				</div>
			</div>
			<div className="flex justify-center items-center gap-4 flex-wrap mt-[77px] max-w-[1200px] mx-auto ">
				{products.map((item) => (
					<div
						key={item.id}
						className="h-[350px]  w-[264px] bg-white py-[12px] px-[13px] rounded-[15px]"
					>
						<Image
							height={184}
							width={240}
							src={item.image!}
							alt="imagen de producto"
							className=" object-cover h-[184px] rounded-[15px]"
						/>
						<div className="leading-6 mt-2">
							<p className="text-[16px] text-[#7C7C7C] font-semibold">shambo</p>
							<p className="text-[22px] text-[#000] font-semibold">
								{item.name}
							</p>
							<p className="text-[16px] text-[#000] font-semibold">
								{item.description}
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
		</div>
	);
};

export default Productos;
