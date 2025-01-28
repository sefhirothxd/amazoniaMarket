'use client';
import React from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';

// Definimos el tipo de datos del formulario
type FormData = {
	nombre: string;
	correo: string;
	telefono: string;
	mensaje: string;
};

const Formulario = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormData>();

	// Función que se ejecuta al enviar el formulario
	const onSubmit: SubmitHandler<FormData> = async (data) => {
		// Aquí llamarás a la función para enviar el correo
		await sendEmail(data);
		// Limpiamos los campos del formulario
		reset();
		toast({
			variant: 'default',
			duration: 3000,
			title: 'Mensaje enviado',
			description: 'Tu mensaje ha sido enviado con éxito',
			color: 'bg-green-500',
		});
	};

	// Función para enviar el correo (la implementaremos después)
	const sendEmail = async (data: FormData) => {
		try {
			await emailjs.send(
				'service_lxcru38', // Reemplaza con tu Service ID
				'template_w4jvcx9', // Reemplaza con tu Template ID
				{
					nombre: data.nombre,
					correo: data.correo,
					telefono: data.telefono,
					mensaje: data.mensaje,
				},
				'oJRVgqyMc0a6ZuP5e' // Reemplaza con tu User ID
			);
		} catch (error) {
			console.error('Error al enviar el correo:', error);
			toast({
				variant: 'destructive',
				duration: 2000,
				title: 'Error al enviar el mensaje',
				description: 'Por favor, intenta de nuevo',
				color: 'bg-red-500',
			});
		}
	};

	return (
		<div className="pb-[80px] bg-gradient-to-t from-[#D5E8D7] from-50% to-[#fff] to-50%">
			<div className="bg-[#EDEDED] flex-wrap md:flex-nowrap flex justify-center items-center py-10 max-w-[1070px] h-auto md:h-[650px] mx-auto gap-[32px] lg:gap-[62px] p-[25px] lg:p-[50px] rounded-[45px]">
				<Image
					src="/formulario.jpg"
					alt="formulario"
					width={454}
					height={557}
					className="rounded-[25px] lg:w-[454px] lg:h-[557px] w-[300px] h-[400px] object-cover"
				/>
				<div className="flex flex-col">
					<h3 className="lg:text-[35px] text-[28px] font-bold mb-[30px] text-center">
						Dinos cómo podemos ayudarte
					</h3>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-[15px] w-full"
					>
						<input
							type="text"
							placeholder="Nombre y apellido"
							className="p-4 rounded-[10px]"
							{...register('nombre', { required: 'Este campo es obligatorio' })}
						/>
						{errors.nombre && (
							<span className="text-red-500">{errors.nombre.message}</span>
						)}

						<input
							type="email"
							placeholder="Correo"
							className="p-4 rounded-[10px]"
							{...register('correo', {
								required: 'Este campo es obligatorio',
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: 'Correo electrónico no válido',
								},
							})}
						/>
						{errors.correo && (
							<span className="text-red-500">{errors.correo.message}</span>
						)}

						<input
							type="tel"
							placeholder="Teléfono"
							className="p-4 rounded-[10px]"
							{...register('telefono', {
								required: 'Este campo es obligatorio',
								pattern: {
									value: /^[0-9]{9}$/,
									message: 'Teléfono no válido (debe tener 10 dígitos)',
								},
							})}
						/>
						{errors.telefono && (
							<span className="text-red-500">{errors.telefono.message}</span>
						)}

						<textarea
							placeholder="Mensaje"
							className="p-4 rounded-[10px]"
							{...register('mensaje', {
								required: 'Este campo es obligatorio',
							})}
						/>
						{errors.mensaje && (
							<span className="text-red-500">{errors.mensaje.message}</span>
						)}

						<div className="flex justify-end">
							<button
								type="submit"
								className="bg-[#EA0029] text-[28px] font-semibold text-[#fff] py-2 px-8 rounded-[15px]"
							>
								Enviar
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Formulario;
