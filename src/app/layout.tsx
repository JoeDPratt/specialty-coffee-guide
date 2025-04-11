import "./globals.css";
import { ReactQueryClientProvider } from "@/components/providers/ReactQueryClientProvider";
import Header from "@/components/shared/header/Header";
export const dynamic = "force-dynamic";
import {
    Teko,
    Sofia_Sans_Condensed,
    Sofia_Sans_Semi_Condensed,
} from "next/font/google";

const teko = Teko({ subsets: ["latin"], variable: "--font-teko" });
const sofiaCondensed = Sofia_Sans_Condensed({
    subsets: ["latin"],
    variable: "--font-sofia-sans-condensed",
});
const sofiaSemiCondensed = Sofia_Sans_Semi_Condensed({
    subsets: ["latin"],
    variable: "--font-sofia-sans",
});

export const metadata = {
    title: "Specialty Coffee Guide",
    description: "Discover the finest specialty coffee beans.",
};
// rgba(229, 215, 221, 0.8), rgba(229, 215, 221, 0.1)
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("Layout Loading...");
    return (
        <html
            lang="en"
            className={`${teko.variable} ${sofiaCondensed.variable} ${sofiaSemiCondensed.variable}`}
        >
            <head>
                <meta
                    name="apple-mobile-web-app-title"
                    content="Specialty Coffee Guide"
                />
            </head>
            <body className="overflow-x-hidden">
                <div
                    className="min-h-screen bg-cover bg-no-repeat bg-center"
                    style={{
                        backgroundImage: `
                            linear-gradient(to bottom, rgba(237, 212, 209, 0.4), rgba(242, 236, 236, 0.1)),
                            url('/images/scg-lines-bg.svg'),
                            url('/images/handmade-paper.png')
                            `,
                        backgroundPosition: "center top, center top, top left",
                        backgroundSize: "cover, auto, auto",
                        backgroundRepeat: "no-repeat, no-repeat, repeat",
                    }}
                >
                    {/* FORCING FONTS */}
                    <div style={{ display: "none" }}>
                        <span style={teko.style}>Teko</span>
                        <span style={sofiaCondensed.style}>Sofia Condensed</span>
                        <span style={sofiaSemiCondensed.style}>Sofia Semi Condensed</span>
                    </div>
                    <Header />
                    <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                </div>
            </body>
        </html>
    );
}
