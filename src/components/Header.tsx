import React from 'react';
import Image from 'next/image';

export const Header = () => {
	return (
		<div className="flex justify-center w-full text-lg">
			<nav className="max-w-screen-xl w-full py-[22px] flex justify-between items-center px-2">
				<Image
					src={'/logo.svg'}
					alt={'Logo amazonia market'}
					height={50}
					width={150}
				/>
				<div className="hidden sm:block">
					<ul className="flex justify-between items-center lg:gap-[49px] gap-[30px] font-semibold">
						<li>Productos</li>
						<li>Tiendas</li>
						<li>Nosotros</li>
						<li>Contácta</li>
					</ul>
				</div>
				<div>
					<a
						href={'https://papachaymarket.com/facturacion-electronica/'}
						target="_blank"
						className="uppercase hidden lg:flex bg-[#EA0029] py-[4px] pl-[18px] pr-[2px] text-white rounded-full  justify-center items-center gap-2"
					>
						facturación
						<div className="bg-white rounded-full p-2">
							<Image
								src={'/icon-factura.svg'}
								alt={'icono de factura'}
								height={24}
								width={24}
							/>
						</div>
					</a>
					<a
						href={'https://papachaymarket.com/facturacion-electronica/'}
						target="_blank"
						className="uppercase lg:hidden flex bg-[#EA0029] py-[3px] px-[3px] text-white rounded-full  justify-center items-center gap-2"
					>
						<div className="bg-white rounded-full p-2">
							<Image
								src={'/icon-factura.svg'}
								alt={'icono de factura'}
								height={24}
								width={24}
							/>
						</div>
					</a>
				</div>
			</nav>
		</div>
	);
};
