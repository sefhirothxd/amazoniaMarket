import React from 'react';
import Image from 'next/image';

const Nosotros = () => {
	return (
		<div
			id="nosotros"
			className="py-[92px] w-full flex justify-center relative h-auto "
		>
			{/* <div className="absolute bottom-0  m-0 left-0 w-full h-full">
				<Image
					src={'/hojas.svg'}
					alt="hojas"
					height={100}
					width={100}
					className="w-full h-full object-center"
				/>
			</div> */}
			<div className="flex justify-center items-center p-3 sm:p-[52px] rounded-[73px] ">
				<div className="flex justify-center items-center gap-[44px] h-auto lg:h-[480px] lg:flex-nowrap flex-wrap-reverse">
					<div className="sm:w-[400px] w-full h-full rounded-lg flex flex-col justify-end items-center">
						<Image
							className="object-cover w-full h-[480px] rounded-lg"
							src="/nosotros.png"
							alt="foto de la tienda"
							width={400}
							height={480}
							quality={100}
						/>
						{/* <div className="flex gap-2 mt-[12px] items-center justify-center">
							<div className="bg-[#000] w-[41px] h-[10px] rounded-[20px]"></div>
							<div className="bg-[#ECECEC] w-[41px] h-[10px] rounded-[20px]"></div>
							<div className="bg-[#ECECEC] w-[41px] h-[10px] rounded-[20px]"></div>
						</div> */}
					</div>
					<div className="font-semibold max-w-[550px]">
						<span className="text-[25px] bg-[#EA0029] py-[4px] px-[15px] rounded-xl text-white">
							Nosotros
						</span>
						<h2 className="lg:text-[45px] text-[30px] leading-[50px] mb-[21px] max-w-[500px]">
							Llevamos la esencia del Perú
						</h2>
						<p className="lg:text-[25px] text-[20px] leading-8 mb-[21px] text-[#717171]">
							En Amazonia Market, ofrecemos productos de calidad en 4
							departamentos: Puerto Maldonado, Iquitos, Tarapoto y Pucallpa,
							destacando por nuestro servicio excepcional y enfoque innovador.
						</p>
						<div className=" flex flex-col items-start gap-[15px] text-[#717171]">
							<div className="flex items-center gap-2 text-[20px]  lg:text-[25px] font-semibold">
								<Image
									width={30}
									height={30}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Productos de alta calidad.</p>
							</div>
							<div className="flex items-center gap-2 text-[20px] lg:text-[25px] font-semibold">
								<Image
									width={30}
									height={30}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Atención amigable y eficiente.</p>
							</div>
							<div className="flex items-center gap-2 text-[20px] lg:text-[25px] font-semibold">
								<Image
									width={30}
									height={30}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Desarrollamos comunidades locales.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Wave SVG */}
			<div className="absolute md:-bottom-[40px]  -bottom-[20px] left-0 w-full block">
				<Image
					src="/nosotrosOndas.svg"
					alt="wave"
					layout="responsive"
					width={1440}
					height={100}
				/>
			</div>
		</div>
	);
};

export default Nosotros;
