import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
	return (
		<footer className="bg-[#679B6A] text-white relative pt-16 pb-[121px] w-full">
			{/* Wavy border */}
			<div className="absolute top-[-100px] left-0 w-full">
				<svg
					id="svg"
					viewBox="0 0 1440 390"
					xmlns="http://www.w3.org/2000/svg"
					className=" w-full h-[150px]"
					preserveAspectRatio="none"
				>
					<path
						d="M 0,400 L 0,150 C 156.2666666666667,181.06666666666666 312.5333333333334,212.13333333333335 482,195 C 651.4666666666666,177.86666666666665 834.1333333333334,112.53333333333333 996,97 C 1157.8666666666666,81.46666666666667 1298.9333333333334,115.73333333333333 1440,150 L 1440,400 L 0,400 Z"
						fill="#679b6a"
					></path>
				</svg>
			</div>

			<div className="container mx-auto px-4">
				<h2 className="text-[45px] font-bold text-center mb-8">
					Nuestras Tiendas
				</h2>

				<div className="flex justify-center items-center flex-col max-w-[900px] mx-auto">
					<div className="flex  justify-between w-full text-[25px] font-semibold mb-[50px]">
						<div>
							<h3 className="font-semibold mb-2">Nosotros</h3>
							<ul>
								<li>Productos</li>
								<li>Tiendas</li>
								<li>Contacto</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-2">Ruc</h3>
							<ul>
								<li>Correo</li>
								<li>Contacto</li>
							</ul>
						</div>
						<div>
							<p className="font-semibold mb-2">Ruc 759456123</p>
							<p>+51 965 462 649</p>
							<p>clientes@amazoniamarket.pe</p>
							<p>Av. el ejercito 749, int 807</p>
						</div>
					</div>
					<div className="flex justify-center flex-col items-center ">
						<h3 className="font-bold text-[39px] mb-[15px]">Síguenos:</h3>
						<div className="flex gap-[32px] mb-[34px]">
							<a
								href="#"
								className="hover:text-gray-200 bg-white w-[50px] h-[50px] flex justify-center items-center  rounded-full"
							>
								<Facebook size={32} color="#000" />
								<span className="sr-only">Facebook</span>
							</a>
							<a
								href="#"
								className="hover:text-gray-200 bg-white w-[50px] h-[50px] flex justify-center items-center  rounded-full"
							>
								<Instagram size={32} color="#000" />
								<span className="sr-only">Instagram</span>
							</a>
							<a
								href="#"
								className="hover:text-gray-200 bg-white w-[50px] h-[50px] flex justify-center items-center  rounded-full"
							>
								<Twitter size={32} color="#000" />
								<span className="sr-only">Twitter</span>
							</a>
						</div>
					</div>
				</div>

				<div className="text-center text-[25px] font-semibold">
					Todos los Derechos reservados por Amazonia Market
				</div>
			</div>
			<Image
				className="absolute bottom-0 left-0 w-full h-full object-fill"
				src="/arbolitos.svg"
				alt="footer"
				width={100}
				height={100}
			/>
		</footer>
	);
};
