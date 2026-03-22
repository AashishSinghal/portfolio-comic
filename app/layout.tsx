import type { Metadata } from "next";
import { Bangers, Comic_Neue } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
});

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aashish Singhal — Full Stack Developer",
  description:
    "Portfolio of Aashish Singhal — Full Stack Developer, React Specialist, and Code Alchemist. Built like a comic book.",
  openGraph: {
    title: "Aashish Singhal — Full Stack Developer",
    description: "A comic-book style developer portfolio. POW!",
    url: "https://aashishsinghal.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bangers.variable} ${comicNeue.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
