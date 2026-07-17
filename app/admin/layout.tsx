import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden w-full">
            <div className="hidden md:block shrink-0">
                <Sidebar />
            </div>
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Header />
                <main
                    className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6"
                    style={{
                        backgroundColor: "#FAFAFA"
                    }}
                >
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}