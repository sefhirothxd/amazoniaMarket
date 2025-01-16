'use client';
import Image from 'next/image';

// Store data
const stores = [
	{
		id: 1,
		name: 'Puerto Maldonado',
		location:
			'Aeropuerto Internacional Capitan FAP Jose Abelardo Quiñonez Gonzales',
		tags: ['Sala de embarque', 'sala principal'],
	},
	{
		id: 2,
		name: 'Iquitos',
		location:
			'Aeropuerto Internacional Capitan FAP Jose Abelardo Quiñonez Gonzales',
		tags: ['Sala de embarque', 'sala principal'],
	},
	{
		id: 3,
		name: 'Tarapoto',
		location: 'Aeropuerto Internacional',
		tags: ['Sala de embarque', 'sala principal'],
	},
	{
		id: 4,
		name: 'Pucallpa',
		location: 'Centro Comercial Plaza Norte',
		tags: ['Sala de embarque', 'sala principal'],
	},
];

export default function StoreCarousel() {
	return (
		<div className="w-full flex flex-col justify-center items-center  mx-auto px-4 py-8 mb-20">
			<h2 className="text-[45px] font-semibold text-center">
				Nuestras Tiendas
			</h2>
			{stores.map(({ id, name, location, tags }) => (
				<div
					key={id}
					className="bg-[#EDEDED] flex justify-start h-auto lg:h-[286px] w-full max-w-[930px] items-center gap-[25px] lg:gap-[38px] mt-8 p-4 rounded-[20px] 
					flex-wrap sm:flex-nowrap					"
				>
					<Image
						src="/tienda.jpg"
						alt="store"
						width={325}
						height={252}
						className="object-cover lg:w-[325px] lg:h-[252px] rounded-[10px] w-[325px] h-[252px] mx-auto sm:mx-0"
					/>
					<div className="flex flex-col gap-4 w-full">
						<div className="flex justify-between lg:items-center sm:flex-col-reverse sm:items-start sm:gap-2 lg:gap-0  lg:flex-row">
							<h3 className="text-[25px]  lg:text-[35px] font-bold overflow-hidden text-ellipsis whitespace-nowrap">
								{name}
							</h3>

							<a
								href="#"
								className="flex items-center justify-center gap-[5px] bg-black text-white lg:w-[150px] lg:px-0 px-2 h-[40px] rounded-full"
							>
								<Image
									className="hidden lg:block"
									src="/location.svg"
									alt="location"
									width={30}
									height={30}
								/>
								<p>Ver mapa</p>
							</a>
						</div>
						<p className="text-[#717171] text-[18px] lg:text-[22px] font-semibold max-w-[500px] lg:max-w-[447px]">
							{location}
						</p>
						<div>
							<p className="lg:text-[22px] text-[18px] font-semibold mb-[13px]">
								Disponible en la:
							</p>
							<div className="flex items-center gap-[15px] lg:gap-[30px] flex-wrap justify-start sm:justify-start">
								<div className="flex items-center gap-2">
									<div className="bg-[#EA0029] rounded-full w-10 h-10 flex justify-center items-center">
										<Image
											src="/embargue.svg"
											alt="location"
											width={31}
											height={31}
										/>
									</div>
									<span className="text-[16px] font-semibold">{tags[0]}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="bg-[#EA0029] rounded-full w-10 h-10 px-2 flex justify-center items-center">
										<Image
											src="/principal.svg"
											alt="location"
											width={28}
											height={28}
										/>
									</div>
									<span className="text-[16px] font-semibold">{tags[1]}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
