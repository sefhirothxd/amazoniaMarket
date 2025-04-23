import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
	try {
		const body = await req.json();

		// No convertimos las fechas a dd/mm/yyyy para insertarlas en la base de datos.
		const fechaIngreso = body.fecha_ingreso; // Mantén el formato original
		const fechaRenovacion = body.fecha_renovacion || null; // Mantén el formato original
		const fechaNacimiento = body.fecha_nacimiento; // Mantén el formato original
		const fechaSalida = body.fecha_salida || null; // Mantén el formato original

		// 1. Crear el usuario en Auth
		const { data: authData, error: authError } =
			await supabase.auth.admin.createUser({
				email: body.correo,
				password: body.dni,
				email_confirm: true,
			});

		if (authError || !authData?.user?.id) {
			return NextResponse.json(
				{ error: authError?.message || 'Error al crear usuario' },
				{ status: 400 }
			);
		}

		const auth_user_id = authData.user.id;

		// 2. Insertar en la tabla empleados con las fechas sin convertir
		const { error: insertError } = await supabase.from('empleados').insert({
			dni: body.dni,
			nombres: body.nombres,
			apellidos: body.apellidos,
			correo: body.correo,
			telefono: body.telefono,
			direccion: body.direccion,
			fecha_nacimiento: fechaNacimiento,
			fecha_ingreso: fechaIngreso,
			fecha_salida: fechaSalida || null,
			estado: body.estado ?? true,
			tienda_id: body.tienda_id,
			cargo_id: body.cargo_id,
			fecha_renovacion: fechaRenovacion || null,
			contrato_url: body.contrato_url || null,
			auth_user_id: authData.user.id,
		});

		if (insertError) {
			if (
				insertError.message.includes('duplicate key value') &&
				insertError.message.includes('empleados_dni_key')
			) {
				// Eliminar el usuario creado si ocurre error por duplicado
				await supabase.auth.admin.deleteUser(auth_user_id);

				return NextResponse.json(
					{ error: 'El DNI ya está registrado' },
					{ status: 400 }
				);
			}

			return NextResponse.json({ error: insertError.message }, { status: 400 });
		}

		return NextResponse.json({ message: 'Empleado registrado con cuenta' });
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Error inesperado:', error);
			return NextResponse.json(
				{ error: 'Ocurrió un error inesperado. ' + error.message },
				{ status: 500 }
			);
		} else {
			console.error('Error inesperado:', error);
			return NextResponse.json(
				{ error: 'Ocurrió un error inesperado.' },
				{ status: 500 }
			);
		}
	}
}
