"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut, X } from "lucide-react";

export default function Header() {
    const { logout, user } = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setShowLogoutModal(false);
        logout();
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#4a4a4a] border-b border-black/10">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
                    <div className="flex h-16 items-center justify-end">
                        <div className="flex items-center gap-2">
                            <div className="h-6 flex items-center justify-center text-xs font-semibold text-white">
                                {user?.email || 'Admin'}
                            </div>
                            <span className="text-sm font-medium sm:inline">
                                <button
                                    onClick={handleLogoutClick}
                                    className="w-full border border-white/20 flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-white/10 transition-colors text-left text-white"
                                >
                                    Logout
                                </button>
                            </span>
                        </div>
                    </div>
                </nav>
            </header>

            {showLogoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button
                            onClick={cancelLogout}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={24} />
                        </button>
                        
                        <div className="text-center">
                            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <LogOut size={32} className="text-red-500" />
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">Logout Confirmation</h2>
                            <p className="text-gray-600 mb-8">
                                Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
                            </p>
                            
                            <div className="flex gap-4">
                                <button
                                    onClick={cancelLogout}
                                    className="flex-1 py-3 px-6 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 py-3 px-6 bg-red-500 text-white rounded-2xl font-bold hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}