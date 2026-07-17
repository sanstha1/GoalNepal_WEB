'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFA]">
            <h2 className="text-2xl font-bold mb-4 text-[#2F2F2F]">Something went wrong!</h2>
            <p className="text-[#6B7280] mb-4">{error.message}</p>
            <button
                onClick={reset}
                className="px-4 py-2 bg-[#FF8A2A] text-white rounded hover:bg-[#F97316]"
            >
                Try again
            </button>
        </div>
    );
}