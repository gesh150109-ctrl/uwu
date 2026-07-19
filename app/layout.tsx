import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bytecode - Círculo de Estudios",
  description: "Plataforma oficial del Círculo de Estudios Bytecode de la UNAP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}