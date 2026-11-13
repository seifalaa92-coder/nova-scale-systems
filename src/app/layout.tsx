import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NOVA Scale Systems — Websites & Automations Built to Turn Enquiries into Customers",
  description:
    "NOVA Scale Systems helps businesses capture more enquiries, respond faster, convert more leads into bookings and sales, and automate repetitive admin.",
  keywords: [
    "Nova Scale Systems",
    "Business Websites",
    "Lead Capture and Follow-up",
    "Booking Automations",
    "Online Sales and Payments",
    "Workflow Automation",
    "Customer Retention",
  ],
  authors: [{ name: "NOVA Scale Systems" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#fbfbfd] text-[#0e0e11] font-sans antialiased selection:bg-[#0071e3] selection:text-white">
        {children}
      </body>
    </html>
  );
}
