import "./globals.css";
export const dynamic = 'force-dynamic'

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
                {children}
            </body>
        </html>
    );
}
