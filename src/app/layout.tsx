import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Helios Archive | Suraj Vaidyanathan",
  description: "Helios - A curated collection of digital artifacts and creative works. Where code becomes art and digital dreams take form.",
  keywords: ["portfolio", "developer", "creative", "3D", "web development", "react", "three.js", "Suraj Vaidyanathan", "Helios"],
  authors: [{ name: "Suraj Vaidyanathan" }],
  openGraph: {
    title: "Helios Archive | Suraj Vaidyanathan",
    description: "Helios - A curated collection of digital artifacts and creative works",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${cinzel.variable} ${cormorant.variable} antialiased bg-[#0a0908] text-stone-100 transition-colors duration-500`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
