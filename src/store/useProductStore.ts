import { create } from 'zustand';
import {
	getProducts,
	getPrice,
	updatePrice,
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
	isShowingPrice: boolean;
	error: string | null;
	changeShowingPrice: () => void;
	fetchProducts: () => Promise<void>;
	fetchStores: () => Promise<void>;
	fetchGetPrice: () => Promise<void>;
	addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
	updateProduct: (product: Product) => Promise<void>;
	deleteProduct: (id: number) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	products: [],
	stores: [],
	isLoading: false,
	isShowingPrice: false,
	error: null,
	fetchGetPrice: async () => {
		set({ isLoading: true, error: null });
		try {
			const statePrice = await getPrice();
			set({ isShowingPrice: statePrice[0].show_price, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch products',
				isLoading: false,
			});
		}
	},
	changeShowingPrice: async () => {
		set({ isLoading: true, error: null });
		try {
			const statePrice = get().isShowingPrice;
			console.log('🚀 ~ changeShowingPrice: ~ s	tatePrice:', statePrice);
			await updatePrice(!statePrice);
			set({ isShowingPrice: statePrice, isLoading: false });
		} catch (error) {
			set({
				error:
					error instanceof Error ? error.message : 'Failed to fetch products',
				isLoading: false,
			});
		}
	},
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
