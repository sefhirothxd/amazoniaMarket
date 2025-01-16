import { create } from 'zustand';
import {
	getProducts,
	addProduct,
	updateProduct,
	deleteProduct,
} from '@/app/actions/productActions';

type Product = {
	id: string;
	name: string;
	price: number;
	stock: number;
};

type ProductStore = {
	products: Product[];
	isLoading: boolean;
	error: string | null;
	fetchProducts: () => Promise<void>;
	addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
	updateProduct: (product: Product) => Promise<void>;
	deleteProduct: (id: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
	products: [],
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
	deleteProduct: async (id) => {
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
