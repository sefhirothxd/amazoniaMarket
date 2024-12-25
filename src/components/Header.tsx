import React from 'react';
import Image from 'next/image';

export const Header = () => {
	return (
		<div className="flex justify-center w-full text-lg">
			<nav className="max-w-screen-xl w-full py-[22px] flex justify-between items-center mr">
				<Image
					src={'/logo.svg'}
					alt={'Logo amazonia market'}
					height={50}
					width={150}
				/>
				<div>
					<ul className="flex justify-between items-center gap-[49px] font-semibold">
						<li>Productos</li>
						<li>Tiendas</li>
						<li>Nosotros</li>
						<li>Contácta</li>
					</ul>
				</div>
				<div>
					<button className="uppercase bg-[#EA0029] py-[4px] pl-[18px] pr-[2px] text-white rounded-full flex justify-center items-center gap-2">
						facturación
						<div className="bg-white rounded-full p-2">
							<Image
								src={'/icon-factura.svg'}
								alt={'icono de factura'}
								height={24}
								width={24}
							/>
						</div>
					</button>
				</div>
			</nav>
		</div>
	);
};
