import { create } from 'zustand';
import {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
	getStores,
} from '@/app/actions/productActions';

type Product = {
	id: number;
	name: string;
	marca: string;
	price: number;
	medida: string;
	image: string | null;
	store_id: number;
	store?: string;
};

type Store = {
	id: number;
	name: string;
};

type ProductStore = {
	products: Product[];
	stores: Store[];
	isLoading: boolean;
	error: string | null;
	fetchProducts: () => Promise<void>;
	fetchStores: () => Promise<void>;
	addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
	updateProduct: (product: Product) => Promise<void>;
	deleteProduct: (id: number) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
	products: [],
	stores: [],
	isLoading: false,
	error: null,
	fetchProducts: async () => {
		set({ isLoading: true, error: null });
		try {
			const products = await getProducts();
			set({ products, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch products',
				isLoading: false,
			});
		}
	},
	fetchStores: async () => {
		set({ isLoading: true, error: null });
		try {
			const stores = await getStores();
			set({ stores, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch stores',
				isLoading: false,
			});
		}
	},
	addProduct: async (product) => {
		set({ isLoading: true, error: null });
		try {
			await addProduct(product);
			const products = await getProducts();
			set({ products, isLoading: false });
		} catch (error) {
			set({
				error: error instanceof Error ? error.message : 'Failed add products',
				isLoading: false,
			});
		}
	},
	updateProduct: async (product) => {
		set({ isLoading: true, error: null });
		try {
			await updateProduct(product);
			const products = await getProducts();
			set({ products, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to update products',
				isLoading: false,
			});
		}
	},
	deleteProduct: async (id: number) => {
		set({ isLoading: true, error: null });
		try {
			await deleteProduct(id);
			const products = await getProducts();
			set({ products, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to delete products',
				isLoading: false,
			});
		}
	},
}));
