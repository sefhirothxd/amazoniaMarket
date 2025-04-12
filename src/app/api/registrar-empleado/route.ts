// app/api/registrar-empleado/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! // Usa la clave service_role aquí
);

export async function POST(req: Request) {
	const body = await req.json();

	// 1. Crear el usuario en Auth
	const { data: authData, error: authError } =
		await supabase.auth.admin.createUser({
			email: body.correo,
			password: body.dni, // Aquí podrías generar una contraseña segura o temporal
			email_confirm: true,
		});

	console.log('authData', authData);

	if (authError) {
		return NextResponse.json({ error: authError.message }, { status: 400 });
	}

	// 2. Insertar en la tabla empleados
	const { error: insertError } = await supabase.from('empleados').insert({
		dni: body.dni,
		nombres: body.nombres,
		apellidos: body.apellidos,
		correo: body.correo,
		telefono: body.telefono,
		direccion: body.direccion,
		fecha_nacimiento: body.fecha_nacimiento,
		fecha_ingreso: body.fecha_ingreso,
		tienda_id: body.tienda_id,
		// Guardas el ID del usuario para relacionar2
		auth_user_id: authData.user.id,
	});

	if (insertError) {
		return NextResponse.json({ error: insertError.message }, { status: 400 });
	}

	return NextResponse.json({
		message: 'Empleado registrado con cuenta',
		// user_id: authData.user.id, // Devuelve el ID del usuario creado
	});
}
