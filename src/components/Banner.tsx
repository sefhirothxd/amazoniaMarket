import React from 'react';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className="relative bg-[#3D4543] text-white min-h-[300px]  md:min-h-[400px] lg:min-h-[400px] xl:min-h-[600px]  w-full">
			{/* Imagen para desktop */}
			<Image
				src="/bannerDesktop.png"
				alt="banner"
				layout="fill"
				className="object-fill w-full h-full hidden lg:block"
				quality={100}
			/>

			{/* Imagen para tablet */}
			<Image
				src="/bannerTablet.png"
				alt="banner"
				layout="fill"
				className="object-fill w-full h-full hidden sm:block lg:hidden"
				quality={100}
			/>

			{/* Imagen para móvil */}
			<Image
				src="/bannerMovil.png"
				alt="banner"
				layout="fill"
				className="object-fill w-full h-full block sm:hidden"
				quality={100}
			/>

			{/* Wave SVG */}
			<div className="absolute lg:-bottom-[40px] md:-bottom-[30px] sm:-bottom-[20px] -bottom-[10px] left-0 w-full block">
				<Image
					src="/bannerVector.svg"
					alt="wave"
					layout="responsive"
					width={1440}
					height={100}
					className="h-full w-full"
				/>
			</div>
		</div>
	);
};

export default Banner;
