'use client';

import type React from 'react';
import { ToastAction } from '@/components/ui/toast';
import { useState, useCallback } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ModalPdfProps {
	onClose: () => void;
}

const ModalPdf: React.FC<ModalPdfProps> = ({ onClose }) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState<
		'idle' | 'success' | 'error'
	>('idle');

	const { toast } = useToast();
	const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
	}, []);

	const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);
	}, []);

	const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(false);

		const droppedFiles = Array.from(e.dataTransfer.files);
		const pdfFiles = droppedFiles.filter(
			(file) => file.type === 'application/pdf'
		);

		if (pdfFiles.length > 0) {
			setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
		}
	}, []);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files) {
				const selectedFiles = Array.from(e.target.files);
				const pdfFiles = selectedFiles.filter(
					(file) => file.type === 'application/pdf'
				);

				if (pdfFiles.length > 0) {
					setFiles((prevFiles) => [...prevFiles, ...pdfFiles]);
				}
			}
		},
		[]
	);

	const handleUpload = async () => {
		if (files.length === 0) return;

		setIsUploading(true);

		const formData = new FormData();
		files.forEach((file) => formData.append('files', file));

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				// throw new Error('Error en la subida de archivos');
				toast({
					title: 'Error',
					description: 'Error al subir archivos',
					action: <ToastAction altText={'Error'}>Error</ToastAction>,
				});
				setUploadStatus('error');
				return;
			}

			setUploadStatus('success');
			toast({
				title: 'Boletas enviadas',
				description: 'Tus boletas se han enviado correctamente',
				action: <ToastAction altText={'ok'}>Ok</ToastAction>,
			});
			setFiles([]); // Limpiar archivos después de subir
			onClose();
		} catch (error) {
			console.error('Error al subir archivos:', error);
			setUploadStatus('error');
		} finally {
			setIsUploading(false);
		}
	};

	const removeFile = (index: number) => {
		setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
			<div className="bg-white px-6 pt-6 rounded-lg">
				<div className="w-full max-w-3xl mx-auto p-4">
					<div
						className={cn(
							'border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out',
							'flex flex-col items-center justify-center text-center',
							isDragging ? 'border-primary bg-primary/5' : 'border-gray-300',
							files.length > 0 && 'pb-4'
						)}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<input
							id="file-upload"
							type="file"
							multiple
							accept=".pdf"
							className="sr-only"
							onChange={handleFileChange}
						/>

						<Upload
							className={cn(
								'h-12 w-12 mb-4',
								isDragging ? 'text-primary' : 'text-gray-400'
							)}
						/>

						<h3 className="text-xl font-medium mb-2">Arrastra las boletas</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Arrastra y suelta tus archivos PDF aquí o
							<label
								htmlFor="file-upload"
								className="text-primary font-bold ml-1 cursor-pointer "
							>
								busca en tu dispositivo
							</label>
						</p>

						{files.length > 0 && (
							<div className="w-full mt-4">
								<div className="text-sm font-medium mb-2">
									{files.length}{' '}
									{files.length === 1
										? 'archivo seleccionado'
										: 'archivos seleccionados'}
								</div>
								<div className="max-h-60 overflow-y-auto">
									{files.map((file, index) => (
										<div
											key={index}
											className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded mb-2"
										>
											<div className="flex items-center">
												<div className="text-sm font-medium truncate max-w-[250px] sm:max-w-md">
													{file.name}
												</div>
												<div className="text-xs text-muted-foreground ml-2">
													{(file.size / 1024).toFixed(0)} KB
												</div>
											</div>
											<button
												onClick={() => removeFile(index)}
												className="text-muted-foreground hover:text-destructive"
											>
												&times;
											</button>
										</div>
									))}
								</div>
							</div>
						)}
					</div>

					<div className="mt-4 flex justify-between flex-row-reverse">
						{files.length > 0 && (
							<button
								onClick={handleUpload}
								disabled={isUploading}
								className={cn(
									'px-4 py-0 rounded-lg text-white font-[18px]',
									'flex items-center justify-center min-w-[100px]',
									isUploading
										? 'bg-primary/70'
										: 'bg-primary hover:bg-primary/90'
								)}
							>
								{isUploading ? (
									<>
										<span className="mr-2">Subiendo...</span>
										<div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
									</>
								) : uploadStatus === 'success' ? (
									<>
										<Check className="h-4 w-4 mr-2" />
										Enviado
									</>
								) : uploadStatus === 'error' ? (
									<>
										<AlertCircle className="h-4 w-4 mr-2" />
										Reintentar
									</>
								) : (
									'Enviar'
								)}
							</button>
						)}
						<button
							onClick={onClose}
							className=" py-2 px-4 text-[18px] bg-[#EA0029] rounded-lg text-white	 font-medium hover:text-primary-dark"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ModalPdf;
