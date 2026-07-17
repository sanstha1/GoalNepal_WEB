import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">User Not Found</h2>
            <p className="text-[#6B7280] mb-4">The user you&apos;re looking for doesn&apos;t exist.</p>
            <Link
                href="/admin/users"
                className="px-4 py-2 bg-[#FF8A2A] text-white rounded hover:bg-[#F97316]"
            >
                Back to Users
            </Link>
        </div>
    );
}