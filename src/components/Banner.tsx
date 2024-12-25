import React from 'react';
import Image from 'next/image';

const Banner = () => {
	return (
		<div className="relative bg-[#3D4543] text-white min-h-[600px]">
			<div className="container mx-auto px-4 pt-20 pb-32">
				<div className="flex flex-col  relative justify-center  max-w-screen-xl mx-auto  ">
					{/* Navigation Arrows */}

					<div className="absolute w-full  flex justify-between items-center">
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
					</div>
					{/* Content */}
					<div className="ml-[70px]">
						<h2 className="text-4xl font-bold mb-2">Year Experience</h2>
						<h1 className="text-5xl font-bold mb-6">Year Experience</h1>
						<p className="text-lg mb-8 max-w-96">
							Lorem ipsum dolor sit amet et pretium consectetur eget amet et
							pretium eget accumsan et tincidunt massa urna.
						</p>
						<div className="pt-[31px]">
							<button className="flex items-center pl-[37px] text-[25px] font-semibold py-[3px] pr-[3px] rounded-full border-[3px] border-white">
								Ver Tiendas{' '}
								<Image
									className="ml-[31px]"
									src="/btn-arrow.svg"
									alt="flecha izquierda"
									width={50}
									height={48}
								/>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Wave SVG */}
			<div className="absolute bottom-0 left-0 w-full">
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
