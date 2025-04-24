import { create } from 'zustand';
import { getEmpleados, getEmpleado } from '@/app/actions/empleadoActions';

interface Empleado {
	cargo_id?: string;
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda: {
		nombre: string;
	} | null;
	correo: string;
	fecha_nacimiento: string;
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
	rol?: string;
	cargo: {
		nombre: string;
	} | null;
	fecha_renovacion?: string | null;
	contrato_url?: string;
}

type Store = {
	id: number;
	name: string;
};

type ProductStore = {
	empleados: Empleado[];
	empleado?: Empleado; // Add this property to fix the issue
	stores: Store[];
	isLoading: boolean;
	isShowingPrice: boolean;
	error: string | null;
	fetchGetEmpleado: () => Promise<void>;
	fetchGetEmpleadoDni: (id: string) => Promise<Empleado[] | undefined>;
};

export const useEmpleadoStore = create<ProductStore>((set) => ({
	empleados: [],
	emplado: {},
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
					error instanceof Error ? error.message : 'Failed to fetch empleados',
				isLoading: false,
			});
		}
	},
	fetchGetEmpleadoDni: async (id: string) => {
		set({ isLoading: true, error: null });
		try {
			const empleados = await getEmpleado(id);
			set({
				empleado: empleados.length > 0 ? empleados[0] : undefined,
				isLoading: false,
			});
			return empleados.length > 0 ? empleados : undefined; // Ensure the return type matches Empleado[] | undefined
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch empleado',
				isLoading: false,
			});
			return [];
		}
	},
}));
