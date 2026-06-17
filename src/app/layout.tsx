import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AssistantMount } from "@/components/chat/assistant-mount";
import { COMPANY } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://najrancement.com"),
  title: {
    default: `${COMPANY.name} — ${COMPANY.tagline}`,
    template: `%s · ${COMPANY.name}`,
  },
  description:
    "Najran Cement Company produces premium Ordinary Portland, Sulphate Resistant, Pozzolanic and plastering cement in the Kingdom of Saudi Arabia. Building trust and delivering quality for over two decades.",
  keywords: [
    "Najran Cement",
    "cement Saudi Arabia",
    "Ordinary Portland Cement",
    "Sulphate Resistant Cement",
    "Pozzolanic Cement",
    "OPC",
    "SRC",
  ],
  openGraph: {
    title: `${COMPANY.name} — ${COMPANY.tagline}`,
    description:
      "Premium cement, produced at industrial scale in Najran, Saudi Arabia since 2005.",
    type: "website",
    locale: "en_US",
    siteName: COMPANY.name,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
          <AssistantMount />
        </SmoothScroll>
      </body>
    </html>
  );
}
