"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const ADMIN_LINKS = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/users", label: "Users" },
];

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => href === "/admin" ? pathname === href : pathname?.startsWith(href);

    return (
        <>
            <aside className={`
                fixed md:static 
                top-0 left-0 
                h-screen w-64 
                bg-[#4a4a4a]
                border-r border-black/10
                z-40 overflow-y-auto`}
            >
                <div className="p-4 border-b border-white/10">
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded bg-white flex items-center justify-center overflow-hidden">
                            <Image 
                                src="/images/GoalNepalLogo.png" 
                                alt="Logo" 
                                width={32} 
                                height={32}
                                className="object-contain"
                            />
                        </div>
                        <span className="font-semibold text-white">Admin Panel</span>
                    </Link>
                </div>

                <nav className="p-2 space-y-1">
                    {
                        ADMIN_LINKS.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                    ? 'bg-white text-black'
                                    : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                <span>{link.label}</span>
                            </Link >
                        ))
                    }
                </nav >
            </aside >
        </>
    );
}