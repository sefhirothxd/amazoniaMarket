import React from 'react';
import Image from 'next/image';

const marcas = {
	marcas: [
		{
			id: 1,
			name: 'Exotic',
			image: '/exotic.svg',
		},
		{
			id: 2,
			name: 'Charapita',
			image: '/charapita.svg',
		},
		{
			id: 3,
			name: 'Chachita',
			image: '/chachita.svg',
		},
		{
			id: 4,
			name: 'Oro verde',
			image: '/oro.svg',
		},
		{
			id: 5,
			name: 'Persa',
			image: '/persa.svg',
		},
	],
};

const Marcas = () => {
	return (
		<div className="bg-[#D5E8D7] pb-[200px] pt-[30px]">
			<div className="text-center mb-[57px]">
				<h3 className="font-semibold text-[45px]">Nuestras marcas</h3>
				<p className="font-semibold text-[25px]">
					Visitanos y compra tus productos favoritos
				</p>
			</div>
			<div className="flex justify-center items-center gap-[30px] flex-wrap">
				{marcas.marcas.map((marca) => (
					<div
						key={marca.id}
						className="flex justify-center items-center w-[265px] h-[68px] bg-white rounded-[10px] p-4"
					>
						<Image src={marca.image} alt={marca.name} width={184} height={68} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Marcas;
