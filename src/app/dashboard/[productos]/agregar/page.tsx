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
import { toast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

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

	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
	const supabase = createClient(supabaseUrl, supabaseAnonKey);

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);

	const handleDelete = async (product: Product) => {
		try {
			//delete image from storage
			const name = product.name.replace(/\s+/g, '');
			await supabase.storage.from('amazonia').remove([name]);

			await deleteProduct(product.id);

			// Muestra un mensaje de éxito
			toast({
				duration: 2000,
				title: 'Producto eliminado',
				description: 'El producto se ha eliminado correctamente.',
			});
		} catch (error) {
			console.log(
				'🚀 ~ file: page.tsx ~ line 116 ~ handleDelete ~ error',
				error
			);
		}
	};

	const handleEdit = (product: Product) => {
		setEditingProduct(product);
		setIsEditDialogOpen(true);
	};

	const handleSave = async (updatedProduct: Product) => {
		try {
			//delete image from storage
			const name = updatedProduct.name.replace(/\s+/g, '');
			await supabase.storage.from('amazonia').remove([name]);

			// Sube la nueva imagen
			await supabase.storage
				.from('amazonia')
				.upload(name, updatedProduct.image!, {
					upsert: true,
				});

			// Obtén la URL pública de la imagen
			const { data } = await supabase.storage
				.from('amazonia')
				.getPublicUrl(name);

			// Actualiza el producto con la nueva URL de la imagen
			updatedProduct.image = data.publicUrl;
			await updateProduct(updatedProduct);

			// Cierra el diálogo de edición y limpia el estado
			setIsEditDialogOpen(false);
			setEditingProduct(null);

			// Muestra un mensaje de éxito
			toast({
				duration: 2000,
				title: 'Producto actualizado',
				description: 'El producto se ha actualizado correctamente.',
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			// Muestra un mensaje de error
			toast({
				duration: 2000,
				title: 'Error',
				description: 'No se pudo actualizar el producto.',
				variant: 'destructive',
			});
		}
	};

	const handleAdd = async (newProduct: Omit<Product, 'id'>) => {
		try {
			await supabase.storage
				.from('amazonia')
				.upload(newProduct.name.replace(/\s+/g, ''), newProduct.image!, {
					upsert: true,
				});
			const { data } = await supabase.storage
				.from('amazonia')
				.getPublicUrl(newProduct.name.replace(/\s+/g, ''));

			newProduct.image = data.publicUrl;

			// console.log('🚀 return link download', newProduct);
			// console.log('🚀 ~ file: page.tsx ~ line 132 ~ handleAdd ~ error', error);

			await addProduct(newProduct);

			setIsAddDialogOpen(false);
		} catch (error) {
			toast({
				title: 'Error',
				description: error instanceof Error ? error.message : 'Unknown error',
				variant: 'destructive',
			});
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
								Marca
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Precio
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Medida
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Imagen
							</TableHead>
							<TableHead className="text-foreground dark:text-gray-300">
								Tienda
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
									{product.marca}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									${product.price.toFixed(2)}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									{product.medida}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									{product.image ? (
										<Image
											src={product.image}
											alt={product.name}
											className="h-8 w-8 rounded-full"
											width={32}
											height={32}
										/>
									) : (
										<div className="h-8 w-8 bg-slate-700"></div>
									)}
								</TableCell>
								<TableCell className="text-foreground dark:text-gray-300">
									{product.store}
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
													onClick={() => handleEdit(product as Product)}
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
											onClick={() => handleDelete(product)}
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
		product: Product extends { id: number } ? Product : Omit<Product, 'id'>
	) => void;
};

function ProductForm({ product, onSave }: ProductFormProps) {
	const {
		stores,
		isLoading,
		// error,
		fetchStores,
	} = useProductStore();

	const [formData, setFormData] = useState(
		product || {
			name: '',
			price: 0,
			marca: '',
			medida: '',
			image: null as File | null,
			//store selected input
			store_id: 0,
		}
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData as Product);
	};

	useEffect(() => {
		fetchStores();
	}, [fetchStores]);

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
					value={formData.price || ''}
					onChange={(e) =>
						setFormData({ ...formData, price: parseFloat(e.target.value) })
					}
					required
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<div>
				<Label htmlFor="stock" className="text-foreground dark:text-gray-300">
					Marca
				</Label>
				<Input
					id="marca"
					value={formData.marca}
					onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
					required
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<div>
				<Label
					htmlFor="description"
					className="text-foreground dark:text-gray-300"
				>
					Medida
				</Label>
				<Input
					id="description"
					required
					value={formData.medida}
					onChange={(e) => setFormData({ ...formData, medida: e.target.value })}
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<div>
				<Select
					required
					onValueChange={
						(value) => setFormData({ ...formData, store_id: Number(value) }) // Manejar el cambio del valor seleccionado
					}
				>
					<SelectTrigger className="w-[200px]">
						<SelectValue placeholder="Selecciona una tienda" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{stores.map((store) => (
								<SelectItem key={store.id} value={store.id.toString()}>
									<SelectLabel>{store.name}</SelectLabel>
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label htmlFor="image" className="text-foreground dark:text-gray-300">
					Imagen
				</Label>
				<Input
					required
					id="image"
					type="file"
					accept="image/*"
					onChange={(e) =>
						setFormData({ ...formData, image: e.target.files?.[0] || null })
					}
					className="bg-background dark:bg-gray-700 text-foreground dark:text-gray-300"
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Loading...' : 'Guardar'}
			</Button>
		</form>
	);
}
