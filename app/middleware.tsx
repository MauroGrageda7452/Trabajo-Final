import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken'); // Suponiendo que usas un token de autenticación en cookies

  if (!token && request.nextUrl.pathname !== '/login') {
    // Si el usuario no está autenticado y no está en la página de login, redirigir a /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && request.nextUrl.pathname === '/login') {
    // Si el usuario está autenticado y está en la página de login, redirigir a la página principal
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/game', '/login', '/'], // Rutas donde aplicar el middleware
};
