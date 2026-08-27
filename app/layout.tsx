import type { Metadata } from "next";
import { Be_Vietnam_Pro, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Analytics from "./analytics";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  // Resolves every page's relative `alternates.canonical` (and any OG image
  // URL) against the apex domain. Without this Next emits no canonical at all.
  // Note: canonicals are set per-page, not here — a canonical on the root
  // layout is inherited by any child that doesn't declare its own, which would
  // point unrelated routes at "/".
  metadataBase: new URL("https://gatherwise.io"),
  title: "Gatherwise | Planning & CRM software for Event & Wedding Planners",
  description:
    "The all-in-one event planning and CRM software built for event and wedding planners — manage timelines, vendors, invoices, and clients in one place. Start free.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${beVietnam.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
