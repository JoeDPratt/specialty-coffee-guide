// src/app/search/layout.tsx
import { HeaderSearch } from "@/components/shared/header/HeaderSearch";

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="lg:fixed lg:inset-0 flex flex-col min-h-screen lg:h-screen lg:overflow-hidden">
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