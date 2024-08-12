import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../ui/globals.css";
import Header from "@/app/Header";
import ToastProvider from "@/app/components/ToastProvider";

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
        <ToastProvider>{children}</ToastProvider>
        </body>
        </html>
    );
}
