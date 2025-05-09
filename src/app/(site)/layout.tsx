import Header from "@/components/shared/header/Header";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}