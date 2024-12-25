import Image from 'next/image';
import React from 'react';

const Productos = () => {
	return (
		<div className="bg-[#FFCC07] py-[106px]">
			<div className="text-center  mb-[55px] font-semibold">
				<h2 className="text-[45px] ">Nuestros Productos</h2>
				<span className="text-[25px]">
					Visitanos y compra tus productos favoritos
				</span>
			</div>
			<div className="flex justify-center items-center gap-[21px]">
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
			<div className="flex justify-center items-center gap-4 flex-wrap mt-[77px] max-w-[1080px] mx-auto">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
					<div key={item} className="h-[300]  w-[250px] bg-white"></div>
				))}
			</div>
		</div>
	);
};

export default Productos;
