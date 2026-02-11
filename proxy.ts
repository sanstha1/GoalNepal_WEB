import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
const adminRoutes = ['/admin'];
const userRoutes = ['/user', '/profile'];
const homeRoute = '/home';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userCookie = cookieStore.get('user')?.value;
    
    let user = null;
    if (userCookie) {
        try {
            user = JSON.parse(userCookie);
        } catch (e) {
            console.error('Failed to parse user cookie:', e);
        }
    }

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
    const isUserRoute = userRoutes.some(route => pathname.startsWith(route));
    
    console.log('Proxy - Path:', pathname);
    console.log('Proxy - Token exists:', !!token);
    console.log('Proxy - User exists:', !!user);
    console.log('Proxy - User role:', user?.role);
    
    if (!token && !isPublicRoute && pathname !== '/') {
        console.log('Redirecting to root - no token');
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && user) {
        if (pathname === '/' || isPublicRoute) {
            console.log('Redirecting to home - already logged in');
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }

        if (isAdminRoute && user.role !== 'admin') {
            console.log('Redirecting to home - not admin');
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }

        if (isUserRoute && user.role !== 'user' && user.role !== 'admin') {
            console.log('Redirecting to root - invalid role');
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: [
        '/',
        '/admin/:path*',
        '/user/:path*',
        '/login',
        '/register',
        '/profile',
        '/home',
        '/forgot-password',
        '/reset-password'
    ]
}