import "./globals.css";
import { ReactQueryClientProvider } from '@/components/providers/ReactQueryClientProvider';
export const dynamic = 'force-dynamic'
import { Teko, Sofia_Sans_Condensed, Sofia_Sans_Semi_Condensed } from 'next/font/google';

const teko = Teko({ subsets: ['latin'], variable: '--font-teko' });
const sofiaCondensed = Sofia_Sans_Condensed({ subsets: ['latin'], variable: '--font-sofia-sans-condensed' });
const sofiaSemiCondensed = Sofia_Sans_Semi_Condensed({ subsets: ['latin'], variable: '--font-sofia-sans' });

export const metadata = {
    title: 'Specialty Coffee Guide',
    description: 'Discover the finest specialty coffee beans.'
}

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
            style={{
                fontFamily: `${teko.style.fontFamily}, ${sofiaCondensed.style.fontFamily}, ${sofiaSemiCondensed.style.fontFamily}`,
            }}
        >
            {/* <body
                className="bg-center bg-gradient-to-b from-black to-white"
                style={{
                    backgroundImage: `url('/images/scg-lines-bg.svg')`,
                    backgroundPosition: 'center -650px'
                }}
            > */}
            <head>
                <meta name="apple-mobile-web-app-title" content="MyWebSite" />
            </head>
            <body
                className="bg-center bg-no-repeat bg-cover min-h-screen"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(229, 215, 221, 0.8), rgba(229, 215, 221, 0.1)), url('/images/scg-lines-bg.svg')`,
                    backgroundPosition: 'center -650px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <ReactQueryClientProvider>
                    {children}
                </ReactQueryClientProvider>
            </body>
        </html >
    );
}
