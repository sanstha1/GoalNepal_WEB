import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const publicRoutes = ['/login', '/register', '/forget-password', '/reset-password'];
const adminRoutes = ['/admin'];
const userRoutes = ['/user', '/profile'];
const homeRoute = '/home'; // Define home route for logged-in users

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
    
    // If no token and trying to access protected routes, redirect to login
    if (!token && !isPublicRoute && pathname !== '/') {
        console.log('Redirecting to login - no token');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If user is authenticated
    if (token && user) {
        // Redirect from public routes (login/register) to home
        if (isPublicRoute) {
            console.log('Redirecting to home - already logged in');
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }

        // Admin route protection
        if (isAdminRoute && user.role !== 'admin') {
            console.log('Redirecting to home - not admin');
            return NextResponse.redirect(new URL(homeRoute, request.url));
        }

        // User route protection (allow both user and admin)
        if (isUserRoute && user.role !== 'user' && user.role !== 'admin') {
            console.log('Redirecting to login - invalid role');
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // If accessing root path without auth, redirect to login
    if (pathname === '/' && !token) {
        console.log('Redirecting to login - root path, no auth');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If accessing root path with auth, redirect to home
    if (pathname === '/' && token && user) {
        console.log('Redirecting to home - root path, authenticated');
        return NextResponse.redirect(new URL(homeRoute, request.url));
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
        '/forget-password',
        '/reset-password'
    ]
}