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
	tienda_id: number;
	correo: string;
	fecha_nacimiento: string; // Formato: 'YYYY-MM-DD'
	fecha_ingreso: string;
	fecha_salida?: string | null;
	estado?: boolean;
	rol?: string; // 'admin' o 'empleado'
}

// Obtener todos los productos
export async function getEmpleados(): Promise<Empleado[]> {
	const { data, error } = await supabase
		.from('empleados')
		.select('*, tienda:tiendas(nombre)');

	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}
	return data || [];
}

export async function getEmpleado(user_id: string): Promise<Empleado[]> {
	const { data, error } = await supabase
		.from('empleados')
		.select('*')
		.eq('auth_user_id', user_id);

	if (error) {
		console.error('Error fetching products:', error);
		throw new Error('Error fetching products');
	}
	return data || [];
}
