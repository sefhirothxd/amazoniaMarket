'use client';

import { useEmpleadoStore } from '@/store/useEmpleadoStore';

export default function Usuario() {
	const { empleado } = useEmpleadoStore();

	return (
		<div className="w-full mx-auto bg-white rounded-lg shadow p-6 space-y-6 ">
			{/* Banner verde */}

			<div className="bg-green-500 h-[265px] rounded-md mb-[150px]" />

			<div className="w-[600px] mx-auto relative pb-[50px]">
				{/* Avatar e información básica */}
				<div className="flex flex-col items-center space-y-2 -mt-16 absolute top-[-140px] left-[0px] ">
					<div className="bg-yellow-400 w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold uppercase">
						{empleado?.nombres.charAt(0)}
					</div>
					<div className="text-center">
						<h2 className="text-xl font-semibold capitalize">
							{(empleado?.nombres || 'Cargando...') +
								' ' +
								(empleado?.apellidos || '')}
						</h2>
						<p className="text-gray-500">{empleado?.correo}</p>
					</div>
				</div>
				{/* Datos generales */}
				<div className="bg-gray-50 p-4 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
					<div className=" border-r-2 border-gray-300 pr-4">
						<p className="text-xs text-gray-500">F. Contrato</p>
						<p className="font-semibold">{empleado?.fecha_ingreso}</p>
					</div>
					<div className=" border-r-2 border-gray-300 pr-4">
						<p className="text-xs text-gray-500">F. Renovación</p>
						<p className="font-semibold">01/06/25</p>
					</div>
					<div className=" border-r-2 border-gray-300 pr-4">
						<p className="text-xs text-gray-500">Cargo</p>
						<p className="font-semibold">Vendedor</p>
					</div>
					<div>
						<p className="text-xs text-gray-500">Tienda</p>
						<p className="font-semibold">{empleado?.tienda_id}</p>
					</div>
				</div>

				{/* Datos personales */}
				<div className="space-y-4 mt-[35px]">
					<h3 className="text-center font-bold text-sm text-gray-700">
						MIS DATOS
					</h3>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs text-black pl-2 pb-2">
								Nombres
							</label>
							<input
								value={empleado?.nombres ?? 'Cargando...'}
								disabled
								className="w-full bg-gray-100 rounded px-3 py-2 capitalize"
							/>
						</div>
						<div>
							<label className="block text-xs text-black pl-2 pb-2">
								Apellidos
							</label>
							<input
								value={empleado?.apellidos ?? 'Cargando...'}
								disabled
								className="w-full bg-gray-100 rounded px-3 py-2 capitalize"
							/>
						</div>
						<div>
							<label className="block text-xs text-black pl-2 pb-2">DNI</label>
							<input
								value={empleado?.dni ?? 'Cargando...'}
								disabled
								className="w-full bg-gray-100 rounded px-3 py-2 capitalize"
							/>
						</div>
						<div>
							<label className="block text-xs text-black pl-2 pb-2">
								Cargo
							</label>
							<input
								value="Vendedor"
								disabled
								className="w-full bg-gray-100 rounded px-3 py-2 capitalize"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
