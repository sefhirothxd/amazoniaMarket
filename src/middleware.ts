import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const supabase = createMiddlewareClient({ req, res });

	// Obtener los datos de la sesión de forma asíncrona
	const sessionData = await supabase.auth.getSession();
	const session = sessionData.data?.session; // Acceder a la sesión desde data

	if (session && req.nextUrl.pathname.startsWith('/dashboard')) {
		const redirectUrl = req.nextUrl.clone();
		redirectUrl.pathname = '/login';
		return NextResponse.redirect(redirectUrl);
	}

	return res;
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
