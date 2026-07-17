"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { handleLogout } from "@/lib/actions/auth-action";
import { useRouter, usePathname } from "next/navigation";
import type { AuthUser } from "@/lib/types/AuthUser";

interface AuthContextProps {
    isAuthenticated: boolean;
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    logout: () => Promise<void>;
    loading: boolean;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookie = parts.pop()?.split(';').shift();
        return cookie ? decodeURIComponent(cookie) : null;
    }
    return null;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const refreshUser = () => {
        try {
            const userCookie = getCookie('user');
            console.log('RefreshUser - User cookie:', userCookie);
            
            if (userCookie) {
                const userData = JSON.parse(userCookie);
                console.log('RefreshUser - Parsed user:', userData);
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Failed to refresh user:", error);
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        try {
            const userCookie = getCookie('user');
            console.log('InitAuth - User cookie:', userCookie);
            
            if (userCookie) {
                const userData = JSON.parse(userCookie);
                console.log('InitAuth - Parsed user:', userData);
                setUser(userData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Auth initialization failed:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading && pathname && (pathname.startsWith('/user') || pathname === '/profile') && !user) {
            router.push('/login');
        }
    }, [user, loading, pathname, router]);

    const logout = async () => {
        await handleLogout();
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, logout, loading, refreshUser }}>
            {!loading ? children : (
                <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF8A2A]"></div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};