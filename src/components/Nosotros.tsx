import React from 'react';
import Image from 'next/image';

const Nosotros = () => {
	return (
		<div className="py-[92px] w-full flex justify-center relative hojas">
			{/* <div className="absolute bottom-0  m-0 left-0 w-full h-full">
				<Image
					src={'/hojas.svg'}
					alt="hojas"
					height={100}
					width={100}
					className="w-full h-full object-center"
				/>
			</div> */}
			<div className="flex justify-center items-center p-[52px] rounded-[73px]   ">
				<div className="flex justify-center items-center  gap-[76px] h-[550px]">
					<div className=" w-[400px] h-full rounded-lg flex flex-col justify-end items-center">
						<Image
							className="object-cover w-full h-[480px] rounded-lg"
							src="/nosotros.png"
							alt=""
							width={400}
							height={480}
						/>
						<div className="flex gap-2 mt-[12px] items-center justify-center">
							<div className="bg-[#679B6A] w-[41px] h-[10px] rounded-[20px]"></div>
							<div className="bg-[#ECECEC] w-[41px] h-[10px] rounded-[20px]"></div>
							<div className="bg-[#ECECEC] w-[41px] h-[10px] rounded-[20px]"></div>
						</div>
					</div>
					<div className="font-semibold max-w-[450px]">
						<span className="text-[25px]">Nosotros</span>
						<h2 className="text-[45px] leading-[50px] mb-[21px]">
							Nosotros us mi consectetur
						</h2>
						<p className="text-[25px] leading-8 mb-[21px] ">
							Lorem ipsum dolor sit consectetur eget amet et pretium Et accumsan
							et tincidunt massa urna.
						</p>
						<div className=" flex flex-col items-start gap-[15px]">
							<div className="flex items-center gap-2 text-[25px] font-semibold">
								<Image
									width={40}
									height={40}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Lorem ipsum sit consectetur.</p>
							</div>
							<div className="flex items-center gap-2 text-[25px] font-semibold">
								<Image
									width={40}
									height={40}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Lorem ipsum sit consectetur.</p>
							</div>
							<div className="flex items-center gap-2 text-[25px] font-semibold">
								<Image
									width={40}
									height={40}
									src="/check.svg"
									alt="icon check"
								/>
								<p>Lorem ipsum sit consectetur.</p>
							</div>
						</div>
						<button className="bg-[#FFD103] text-[25px] py-3 px-[34px] rounded-[20px] mt-[31px]">
							Nosotros
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nosotros;
