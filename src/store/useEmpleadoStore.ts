import { create } from 'zustand';
import { getEmpleados } from '@/app/actions/empleadoActions';

interface Empleado {
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda_id: number;
	correo: string;
	fecha_nacimiento: string; // Formato: 'YYYY-MM-DD'
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
}

type Store = {
	id: number;
	name: string;
};

type ProductStore = {
	empleados: Empleado[];
	stores: Store[];
	isLoading: boolean;
	isShowingPrice: boolean;
	error: string | null;
	fetchGetEmpleado: () => Promise<void>;
};

export const useEmpleadoStore = create<ProductStore>((set) => ({
	empleados: [],
	stores: [],
	isLoading: false,
	isShowingPrice: false,
	error: null,
	fetchGetEmpleado: async () => {
		set({ isLoading: true, error: null });
		try {
			const statePrice = await getEmpleados();
			set({ empleados: statePrice, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch products',
				isLoading: false,
			});
		}
	},
}));
