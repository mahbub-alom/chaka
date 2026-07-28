import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaka BD - Premium Automotive & Spares Marketplace",
  description: "Bangladesh's premium automobile marketplace and certified Japanese auction sheet verification platform. Get real pricing structures, detailed inspections, and trusted sellers.",
  keywords: ["Chaka BD", "Automobile Marketplace", "Bangladesh Cars", "Japanese Auction Sheet", "Verify Auction Sheet"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
