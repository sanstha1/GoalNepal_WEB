import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const userCookie = cookieStore.get('user')?.value;
        
        console.log('API /user-data - User cookie:', userCookie);
        
        if (!userCookie) {
            return NextResponse.json({ user: null }, { status: 401 });
        }
        
        const user = JSON.parse(userCookie);
        console.log('API /user-data - Parsed user:', user);
        
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return NextResponse.json({ user: null }, { status: 500 });
    }
}