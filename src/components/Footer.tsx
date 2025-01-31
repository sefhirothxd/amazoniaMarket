import React from 'react';
import Image from 'next/image';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
	return (
		<footer className="bg-[#679B6A] text-white relative pt-[200px] pb-[121px] w-full ">
			{/* Wavy border */}
			{/* <div className="absolute top-[-100px] left-0 w-full">
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
			</div> */}
			{/* Wave SVG */}
			<div className="absolute -top-0  md:-top-[30px] left-0 w-full block">
				<Image
					src="/ondasMarca.svg"
					alt="wave"
					layout="responsive"
					width={1440}
					height={100}
				/>
			</div>

			<div className="container mx-auto px-4">
				<div className="flex justify-center items-center flex-col mx-auto text-[20px] lg:text-[25px] font-semibold ">
					<div className="flex gap-[20px] flex-col lg:flex-row lg:gap-0 justify-between w-full mb-[50px] mx-auto flex-wrap lg:max-w-[1200px] md:max-w-[90%]  ">
						<div>
							<Image
								src="/logoFooter.svg"
								alt="logo"
								width={244}
								height={26}
								className="mb-4"
							/>
							<p className=" max-w-[286px] mb-[30px]">
								En Amazonia Market, ofrecemos productos de calidad en 4
								departamentos.
							</p>
							<Image
								src="/sugerencia.svg"
								alt="logo"
								width={244}
								height={56}
								className="mb-4"
							/>
						</div>
						<div className="">
							<ul className="flex flex-col gap-[23px] ">
								<li>
									<Link href="/nosotros">Nosotros</Link>
								</li>
								<li>
									<Link href="/productos">Productos</Link>
								</li>
								<li>
									<Link href="/tiendas">Tiendas</Link>
								</li>
								<li>
									<Link href="/contacto">Contacto</Link>
								</li>
							</ul>
						</div>
						<div>
							<ul className="flex flex-col gap-[23px] ">
								<li className="flex gap-[12px] md:gap-[25px] items-center">
									<Image
										src="/iconRuc.svg"
										alt="ubicacion"
										width={18}
										height={22}
									/>
									<p>Ruc 759456123</p>
								</li>
								<li className="flex gap-[12px] md:gap-[25px] items-center">
									<Image
										src="/iconTelefono.svg"
										alt="ubicacion"
										width={21}
										height={24}
									/>
									<p>+51 965 462 649</p>
								</li>
								<li className="flex gap-[12px] md:gap-[25px] items-center">
									<Image
										src="/iconCorreo.svg"
										alt="ubicacion"
										width={20}
										height={18}
									/>
									<p
										className="
									overflow-hidden text-ellipsis whitespace-nowrap 
									"
									>
										Aclientes@amazoniamarket.com
									</p>
								</li>
								<li className="flex gap-[12px] md:gap-[25px] items-center">
									<Image
										src="/iconUbicacion.svg"
										alt="ubicacion"
										width={18}
										height={25}
									/>
									<p>Av. el ejercito 749, int 807</p>
								</li>
							</ul>
						</div>
					</div>
					<div className="flex justify-center flex-col items-center ">
						<h3 className="font-bold lg:text-[39px] text-[25px] mb-[15px]">
							Síguenos:
						</h3>
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

				<div className="text-center font-semibold ">
					Todos los Derechos reservados por Amazonia Market
				</div>
			</div>
			<Image
				className="absolute bottom-0 left-0 md:w-full md:h-full md:object-fill w-full object-bottom h-auto object-contain"
				src="/arbolitos.svg"
				alt="footer"
				width={100}
				height={100}
			/>
		</footer>
	);
};
