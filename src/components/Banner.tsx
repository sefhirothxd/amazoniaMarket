import React from 'react';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className="relative bg-[#3D4543] text-white  min-h-[300px] sm:[200px] md:h-[400px]  lg:h-[500px]  xl:h-[600px] 2xl:h-[700px] w-full">
			<Image
				src="/bannerNuevo.webp"
				alt="banner"
				layout="fill"
				className="object-fill w-full h-auto lg:block hidden"
			/>
			<Image
				src="/bannerTablet.webp"
				alt="banner"
				layout="fill"
				className="object-cover w-full h-auto block lg:hidden"
			/>
			<Image
				src="/bannerMovil.webp"
				alt="banner"
				layout="fill"
				className="object-cover w-full h-auto block sm:hidden"
			/>
			{/* <div className="container mx-auto px-4 pt-20 pb-32">
				<div className="flex flex-col  relative justify-center  max-w-screen-xl mx-auto  "> */}
			{/* Navigation Arrows */}
			{/* <div className="absolute w-full  flex justify-between items-center">
						<button>
							<Image
								src="/left-arrow.svg"
								alt="flecha izquierda"
								width={15}
								height={25}
							/>
						</button>
						<button>
							<Image
								src="/right-arrow.svg"
								alt="flecha izquierda"
								width={15}
								height={25}
							/>
						</button>
					</div> */}
			{/* </div>
			</div> */}

			{/* Wave SVG */}
			<div className="absolute lg:-bottom-[40px] md:-bottom-[30px] sm:-bottom-[20px]   -bottom-[10px] left-0 w-full block">
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
