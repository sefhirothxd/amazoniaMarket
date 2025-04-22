'use server';

import { createClient } from '@supabase/supabase-js';

// Configura el cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Empleado {
	id?: number;
	nombres: string;
	apellidos: string;
	telefono: string;
	direccion: string;
	dni: string;
	tienda: {
		nombre: string;
	} | null;
	correo: string;
	fecha_nacimiento: string;
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
	rol?: string;
	cargo: {
		nombre: string;
	} | null;
	fecha_renovacion?: string | null;
	contrato_url?: string;
}

// Obtener todos los productos
export async function getEmpleados(): Promise<Empleado[]> {
	const { data, error } = await supabase
		.from('empleados')
		.select('*, tienda:tiendas(nombre), cargo(nombre)');
	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}
	return data || [];
}

export async function getEmpleado(user_id: string): Promise<Empleado[]> {
	const { data, error } = await supabase
		.from('empleados')
		.select('*, cargo(nombre), tienda:tiendas(nombre)')
		.eq('auth_user_id', user_id);

	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}
	return data || [];
}
