import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "@/app/components/header";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Retailer",
    description: "The best retailer shop",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased`}>
        <Header/>
        <div>{children}</div>
        </body>
        </html>
    );
}
