'use server';

import fs from 'fs/promises';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
console.log('aqui toy : ', productsFilePath);
type Product = {
	id: string;
	name: string;
	price: number;
	stock: number;
};

export async function getProducts(): Promise<Product[]> {
	try {
		// Ensure the directory exists
		await fs.mkdir(path.dirname(productsFilePath), { recursive: true });

		const data = await fs.readFile(productsFilePath, 'utf8');
		console.log('data : ', data);
		return JSON.parse(data);
	} catch (error) {
		console.error('Error reading products:', error);
		// If the file doesn't exist, create it with an empty array
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
			await fs.writeFile(productsFilePath, '[]', 'utf8');
			return [];
		}
		throw error;
	}
}

export async function addProduct(
	product: Omit<Product, 'id'>
): Promise<Product> {
	const products = await getProducts();
	const id = (
		Math.max(...products.map((p) => parseInt(p.id)), 0) + 1
	).toString();
	const newProduct = { ...product, id };
	products.push(newProduct);
	await fs.writeFile(
		productsFilePath,
		JSON.stringify(products, null, 2),
		'utf8'
	);
	return newProduct;
}

export async function updateProduct(updatedProduct: Product): Promise<Product> {
	const products = await getProducts();
	const index = products.findIndex((p) => p.id === updatedProduct.id);
	if (index !== -1) {
		products[index] = updatedProduct;
		await fs.writeFile(
			productsFilePath,
			JSON.stringify(products, null, 2),
			'utf8'
		);
	}
	return updatedProduct;
}

export async function deleteProduct(id: string): Promise<void> {
	const products = await getProducts();
	const updatedProducts = products.filter((p) => p.id !== id);
	await fs.writeFile(
		productsFilePath,
		JSON.stringify(updatedProducts, null, 2),
		'utf8'
	);
}
