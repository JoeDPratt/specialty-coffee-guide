import "./globals.css";
import { ReactQueryClientProvider } from '@/components/providers/ReactQueryClientProvider';
export const dynamic = 'force-dynamic'

export const metadata = {
    title: 'Specialty Coffee Guide',
    description: 'Discover the finest specialty coffee beans.',
  }

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    console.log("Layout Loading...");
    return (
        <html lang="en">
            <body
                className="bg-no-repeat bg-center bg-pr-100"
                style={{
                    backgroundImage: `url('/scg-lines-bg.svg')`,
                    backgroundPosition: 'center -650px'
                }}
            >
                <ReactQueryClientProvider>
                {children}
                </ReactQueryClientProvider>
            </body>
        </html>
    );
}
