'use server';

import { createClient } from '@supabase/supabase-js';

// Configura el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

type Product = {
	id: number;
	name: string;
	price: number;
	marca: string;
	medida: string;
	image: string | null;
	store_id: number;
};

type Store = {
	id: number;
	name: string;
};

// Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
	const { data, error } = await supabase
		.from('products')
		.select('*, store:store_id (name)');

	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}

	// Mapear los datos para devolverlos en el formato deseado
	const formattedData = data.map((product) => ({
		...product,
		store: product.store.name, // Agregar el nombre de la tienda al objeto del producto
	}));

	console.log('🚀 ~ getProducts ~ data:', formattedData);

	return formattedData || [];
}

//obtener nombre de las tiendas
export async function getStores(): Promise<Store[]> {
	const { data, error } = await supabase.from('store').select('*');
	console.log('🚀 ~ getStores ~ data:', data);

	if (error) {
		console.error('Error fetching stores:', error);
		throw new Error('Error fetching stores');
	}

	return data || [];
}

// Agregar un nuevo producto
export async function addProduct(
	product: Omit<Product, 'id'>
): Promise<Product> {
	const session = await supabase.auth.getSession();
	const user = await supabase.auth.getUser();

	console.log('🚀 ~ get session', session);
	console.log('🚀 ~ get user', user);

	const { data, error } = await supabase
		.from('products')
		.insert([product])
		.select()
		.single();

	if (error) {
		console.error('Error adding product:', error);
		throw new Error('Error adding product');
	}

	return data!;
}

// Actualizar un producto existente
export async function updateProduct(updatedProduct: Product): Promise<Product> {
	console.log('Updating product with ID:', updatedProduct.id);
	console.log('Product data:', updatedProduct);
	const { data, error } = await supabase
		.from('products')
		.update({
			name: updatedProduct.name,
			price: updatedProduct.price,
			marca: updatedProduct.marca,
			medida: updatedProduct.medida,
			image: updatedProduct.image,
			store_id: updatedProduct.store_id,
		})
		.eq('id', updatedProduct.id)
		.select()
		.single();

	if (error) {
		console.error('Error updating product:', error);
		throw new Error('Error updating product');
	}
	if (!data) {
		throw new Error('Product not found');
	}

	return data!;
}

// Eliminar un producto por ID
export async function deleteProduct(id: number): Promise<void> {
	const { error } = await supabase.from('products').delete().eq('id', id);

	if (error) {
		console.error('Error deleting product:', error);
		throw new Error('Error deleting product');
	}
}
