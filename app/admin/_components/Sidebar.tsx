"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Users, Trophy, Menu, X } from "lucide-react";
import { useState } from "react";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/tournaments", label: "Tournaments", icon: Trophy },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <>
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden fixed top-20 left-4 z-30 p-2 rounded-lg bg-white border border-[#E5E7EB] text-[#2F2F2F]"
            >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside
                className={`
                    fixed md:static 
                    top-16 md:top-0 left-0 
                    h-[calc(100vh-64px)] md:h-screen w-64 
                    z-20 overflow-y-auto
                    transition-transform duration-300 ease-out
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    border-r
                `}
                style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB"
                }}
            >
                <motion.div
                    className="p-6 border-b"
                    style={{ borderColor: "#E5E7EB" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/admin" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                        <span className="text-xl font-black tracking-tight text-[#2F2F2F]">Goal</span>
                        <span
                            className="text-xl font-black tracking-tight px-1.5 py-0.5 rounded-lg"
                            style={{
                                backgroundColor: "#FF8A2A",
                                color: "#fff",
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Nepal
                        </span>
                    </Link>
                </motion.div>

                <nav className="p-4 space-y-2">
                    {ADMIN_LINKS.map((link, idx) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);

                        return (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.4 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                                        active
                                            ? "text-white"
                                            : "text-[#6B7280] hover:text-[#2F2F2F]"
                                    }`}
                                    style={
                                        active
                                            ? {
                                                backgroundColor: "#FF8A2A"
                                            }
                                            : {}
                                    }
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon size={18} />
                                    <span>{link.label}</span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>

                <motion.div
                    className="p-4 mt-auto border-t"
                    style={{ borderColor: "#E5E7EB" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                </motion.div>
            </aside>
        </>
    );
}