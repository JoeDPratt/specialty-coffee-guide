import Header from "@/components/shared/header/Header";
import { HeaderSearch } from "@/components/shared/header/HeaderSearch";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:h-screen lg:overflow-hidden">
            <HeaderSearch />
            <main className="flex-1 overflow-y-visible lg:overflow-y-auto overscroll-contain">
                {children}
            </main>
        </div>
    );
}