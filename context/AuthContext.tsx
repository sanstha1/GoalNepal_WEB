"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { handleLogout, handleWhoAmI } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import type { AuthUser } from "@/lib/types/AuthUser";

interface AuthContextProps {
    isAuthenticated: boolean;
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await handleWhoAmI();
                if (response.success && response.user) {
                    setUser(response.user);
                    setIsAuthenticated(true);
                }
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const logout = async () => {
        await handleLogout();
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, logout, loading }}>
            {!loading ? children : (
                <div className="min-h-screen flex items-center justify-center bg-[#fdfcf0]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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