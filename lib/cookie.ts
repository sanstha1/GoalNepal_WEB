"use server"

import { cookies } from "next/headers"

interface UserData {
    _id: string;
    fullName: string;
    email: string;
    role: string;
    profilePicture?: string | null; // Added | null here
    createdAt: string;
    updatedAt: string;
    [key: string]: unknown;
}

export const setAuthToken = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'token',
        value: token,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })
}

export const getAuthToken = async () => {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value || null;
}

export const setUserData = async (userData: UserData) => {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'user', 
        value: JSON.stringify(userData),
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    })
}

export const getUserData = async (): Promise<UserData | null> => {
    const cookieStore = await cookies();
    const userData = cookieStore.get('user')?.value || null;
    return userData ? JSON.parse(userData) : null;
}

export const clearAuthCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('user');
}