import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex w-full h-screen overflow-hidden'>
            <div className='page-wrapper flex w-full'>
                <div className='xl:block hidden'>
                    <Sidebar />
                </div>
                <div className='w-full flex flex-col overflow-hidden'>
                    <Header />
                    <main className="bg-[#fefee3] mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 p-2 flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}