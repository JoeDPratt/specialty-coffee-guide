import Header from "@/components/shared/header/Header";
import { HeaderSearch } from "@/components/shared/header/HeaderSearch";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col lg:h-screen lg:overflow-hidden">
            <HeaderSearch />
            <main
                tabIndex={-1}
                id="main-content"
                role="main"
                aria-labelledby="main-heading"
                className="flex-1 overflow-y-visible lg:overflow-y-auto overscroll-contain">
                <h1 id="main-heading" className="sr-only">Coffee Search Page</h1>
                {children}
            </main>
        </div>
    );
}