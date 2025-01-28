import React from 'react';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className="relative bg-[#3D4543] text-white max-h-[600px] min-h-[300px] sm:[200px] md:h-[300px]  lg:h-[400px]  xl:h-[500px] w-full">
			<Image
				src="/banner.jpg"
				alt="banner"
				layout="fill"
				className="object-fill w-full h-full"
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
			<div className="absolute bottom-0 left-0 w-full hidden md:block">
				<svg
					viewBox="0 0 1440 120"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					className="w-full h-[120px]"
				>
					<path
						d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
						fill="white"
					/>
				</svg>
			</div>
		</div>
	);
};

export default Banner;
