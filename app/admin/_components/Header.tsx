"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { LogOut, X } from "lucide-react";
import { motion } from "framer-motion";

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
            <header
                className="sticky top-0 z-50 border-b"
                style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB"
                }}
            >
                <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
                    <div className="flex h-16 items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-xl font-bold text-[#2F2F2F]">Admin Dashboard</h1>
                        </motion.div>
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="text-sm text-[#6B7280]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {user?.email || 'Administrator'}
                            </motion.div>
                            <motion.button
                                onClick={handleLogoutClick}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition"
                                style={{
                                    borderColor: "rgba(255, 138, 42, 0.3)",
                                    color: "#FF8A2A"
                                }}
                                whileHover={{
                                    backgroundColor: "rgba(255, 138, 42, 0.1)",
                                    borderColor: "rgba(255, 138, 42, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogOut size={16} />
                                Logout
                            </motion.button>
                        </div>
                    </div>
                </nav>
            </header>

            {showLogoutModal && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 px-4"
                    style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
                        style={{
                            backgroundColor: "#FFFFFF",
                            border: "1px solid #E5E7EB"
                        }}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <motion.button
                            onClick={cancelLogout}
                            className="absolute top-6 right-6 text-[#9CA3AF] hover:text-[#6B7280] transition"
                            whileHover={{ rotate: 90 }}
                        >
                            <X size={24} />
                        </motion.button>

                        <div className="text-center">
                            <motion.div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                                style={{
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    border: "2px solid rgba(239, 68, 68, 0.25)"
                                }}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <LogOut size={32} style={{ color: "#EF4444" }} />
                            </motion.div>

                            <motion.h2
                                className="text-2xl font-bold text-[#2F2F2F] mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Logout Confirmation
                            </motion.h2>
                            <motion.p
                                className="text-[#6B7280] mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Are you sure you want to logout? You&apos;ll need to sign in again to access your account.
                            </motion.p>

                            <motion.div
                                className="flex gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <motion.button
                                    onClick={cancelLogout}
                                    className="flex-1 py-3 px-6 rounded-lg font-bold transition"
                                    style={{
                                        backgroundColor: "#FAFAFA",
                                        border: "1px solid #E5E7EB",
                                        color: "#2F2F2F"
                                    }}
                                    whileHover={{
                                        backgroundColor: "#F3F4F6"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={confirmLogout}
                                    className="flex-1 py-3 px-6 rounded-lg font-bold text-white transition"
                                    style={{
                                        backgroundColor: "#EF4444"
                                    }}
                                    whileHover={{
                                        backgroundColor: "#DC2626"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Logout
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
}