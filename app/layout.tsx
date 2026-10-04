import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Fraunces, Open_Sans } from "next/font/google";
import "./globals.css";

const open = Open_Sans({ subsets: ["latin"], variable: "--font-open" });
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Rotary Club Mendoza Sur",
  description:
    "Rotary Club Mendoza Sur: profesionales, vecinos y amigos al servicio de la comunidad mendocina desde 1968.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${open.variable} ${display.variable} font-open bg-paper text-ink antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
