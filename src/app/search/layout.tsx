import Header from "@/components/shared/header/Header";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto overscroll-contain">
                {children}
            </main>
        </div>
    );
}