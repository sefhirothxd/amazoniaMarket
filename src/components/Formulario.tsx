import React from 'react';
import Image from 'next/image';

const Formulario = () => {
	return (
		<div className="pb-[80px] bg-gradient-to-t from-[#D5E8D7] from-50% to-[#fff] to-50%">
			<div className="bg-[#EDEDED] flex-wrap md:flex-nowrap  flex justify-center items-center py-10 max-w-[1070px] h-auto md:h-[650px] mx-auto gap-[32px]  lg:gap-[62px] p-[25px] lg:p-[50px] rounded-[45px]">
				<Image
					src="/formulario.jpg"
					alt="formulario"
					width={454}
					height={557}
					className="rounded-[25px] lg:w-[454px] lg:h-[557px] w-[300px] h-[400px] object-cover"
				/>
				<div className="flex flex-col">
					<h3 className="lg:text-[35px] text-[28px] font-bold mb-[30px] text-center">
						Dinos cómo podemos ayudarte
					</h3>
					<form action="" className="flex  flex-col gap-[15px]  w-full ">
						<input
							type="text"
							placeholder="Nombre y apellido"
							className="p-4 rounded-[10px]"
						/>
						<input
							type="text"
							placeholder="Correo"
							className="p-4 rounded-[10px]"
						/>
						<input
							type="text"
							placeholder="Telefono"
							className="p-4 rounded-[10px]"
						/>
						<textarea
							name="mensaje"
							id="mensaje"
							placeholder="Mensaje"
							className="p-4 rounded-[10px]"
						></textarea>
						<div className="flex justify-end">
							<button className="bg-[#EA0029] text-[28px] font-semibold  text-[#fff] py-2 px-8 rounded-[15px]">
								Enviar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Formulario;
