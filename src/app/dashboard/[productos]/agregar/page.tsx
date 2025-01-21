'use client';

import { useEffect, useState } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductStore } from '@/store/useProductStore';

type Product = {
	id: string;
	name: string;
	description: string;
	price: number;
	stock: number;
};

function ProductList() {
	const {
		products,
		// isLoading,
		// error,
		fetchProducts,
		addProduct,
		updateProduct,
		deleteProduct,
	} = useProductStore();

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	const handleDelete = async (id: string) => {
		await deleteProduct(id);
	};

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setIsEditDialogOpen(true);
	};

	const handleSave = async (updatedProduct: Product) => {
		try {
			await updateProduct(updatedProduct);
			setIsEditDialogOpen(false);
			setEditingProduct(null);
			// toast({
			// 	title: 'Producto actualizado',
			// 	description: 'El producto se ha actualizado correctamente.',
			// });
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// toast({
			// 	title: 'Error',
			// 	description: 'No se pudo actualizar el producto.',
			// 	variant: 'destructive',
			// });
		}
	};

	const handleAdd = async (newProduct: Omit<Product, 'id'>) => {
		try {
			await addProduct(newProduct);
			setIsAddDialogOpen(false);
			// toast({
			// 	title: 'Producto agregado',
			// 	description: 'El nuevo producto se ha agregado correctamente.',
			// });
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// toast({
			// 	title: 'Error',
			// 	description: 'No se pudo agregar el producto.',
			// 	variant: 'destructive',
			// });
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<Card className="bg-background dark:bg-gray-800">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-foreground dark:text-gray-100">
					Productos
				</CardTitle>
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogTrigger asChild>
						<Button size="sm">
							<Plus className="mr-2 h-4 w-4" />
							Agregar Producto
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-background dark:bg-gray-800">
						<DialogHeader>
							<DialogTitle className="text-foreground dark:text-gray-100">
								Agregar Nuevo Producto
							</DialogTitle>
							<DialogDescription className="text-muted-foreground dark:text-gray-400">
								Ingrese los detalles del nuevo producto aquí.
							</DialogDescription>
						</DialogHeader>
						<ProductForm onSave={handleAdd} />
					</DialogContent>
				</Dialog>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="text-foreground dark:text-gray-300">
								Nombre
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Descripcion
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Precio
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Stock
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Acciones
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell className="font-medium text-foreground dark:text-gray-300">
									{product.name}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									{product.description}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									${product.price.toFixed(2)}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									{product.stock}
								</TableCell>
								<TableCell>
									<div className="flex space-x-2">
										<Dialog
											open={isEditDialogOpen}
											onOpenChange={setIsEditDialogOpen}
										>
											<DialogTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleEdit(product)}
												>
													<Edit className="h-4 w-4" />
												</Button>
											</DialogTrigger>
											<DialogContent className="bg-background dark:bg-gray-800">
												<DialogHeader>
													<DialogTitle className="text-foreground dark:text-gray-100">
														Editar Producto
													</DialogTitle>
													<DialogDescription className="text-muted-foreground dark:text-gray-400">
														Modifique los detalles del producto aquí.
													</DialogDescription>
												</DialogHeader>
												{editingProduct && (
													<ProductForm
														product={editingProduct}
														onSave={handleSave}
													/>
												)}
											</DialogContent>
										</Dialog>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleDelete(product.id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default ProductList;

type ProductFormProps = {
	product?: Product;
	onSave: (
		product: Product extends { id: string } ? Product : Omit<Product, 'id'>
	) => void;
};

function ProductForm({ product, onSave }: ProductFormProps) {
	const [formData, setFormData] = useState(
		product || { name: '', price: 0, stock: 0 }
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData as Product);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<Label htmlFor="name" className="text-foreground dark:text-gray-300">
					Nombre
				</Label>
				<Input
					id="name"
					value={formData.name}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					required
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<div>
				<Label htmlFor="price" className="text-foreground dark:text-gray-300">
					Precio
				</Label>
				<Input
					id="price"
					type="number"
					step="0.01"
					value={formData.price}
					onChange={(e) =>
						setFormData({ ...formData, price: parseFloat(e.target.value) })
					}
					required
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<div>
				<Label htmlFor="stock" className="text-foreground dark:text-gray-300">
					Stock
				</Label>
				<Input
					id="stock"
					type="number"
					value={formData.stock}
					onChange={(e) =>
						setFormData({ ...formData, stock: parseInt(e.target.value) })
					}
					required
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<Button type="submit">Guardar</Button>
		</form>
	);
}
