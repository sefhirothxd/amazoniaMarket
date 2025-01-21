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
	description: string;
	stock: number;
};

// Obtener todos los productos
export async function getProducts(): Promise<Product[]> {
	const { data, error } = await supabase.from('products').select('*');
	console.log('🚀 ~ getProducts ~ data:', data);
	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}

	return data || [];
}

// Agregar un nuevo producto
export async function addProduct(
	product: Omit<Product, 'id'>
): Promise<Product> {
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
	const { data, error } = await supabase
		.from('products')
		.update({
			name: updatedProduct.name,
			price: updatedProduct.price,
			description: updatedProduct.description,
			stock: updatedProduct.stock,
		})
		.eq('id', updatedProduct.id)
		.select()
		.single();

	if (error) {
		console.error('Error updating product:', error);
		throw new Error('Error updating product');
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
