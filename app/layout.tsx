import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Disaster Recovery Brisbane | Water Fire Damage Restoration | 1300 309 361",
  description: "Professional disaster recovery services in Brisbane, Ipswich & Logan. 24/7 emergency water damage, fire damage restoration & mould remediation. Fast response, quality results.",
  keywords: "disaster recovery brisbane, water damage restoration brisbane, fire damage restoration, mould removal brisbane, emergency restoration, flood damage repair, storm damage brisbane, ipswich disaster recovery, logan disaster recovery",
  authors: [{ name: "Disaster Recovery Brisbane" }],
  creator: "Disaster Recovery Brisbane",
  publisher: "Disaster Recovery Brisbane",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://disasterrecoverybrisbane.com.au",
    siteName: "Disaster Recovery Brisbane",
    title: "Professional Disaster Recovery Services Brisbane | 24/7 Emergency Response",
    description: "Expert water damage, fire damage restoration & mould remediation services across Brisbane, Ipswich & Logan. Call 1300 309 361 for immediate assistance.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Disaster Recovery Brisbane - Professional Emergency Restoration Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disaster Recovery Brisbane | 24/7 Emergency Response",
    description: "Professional disaster recovery services across Brisbane, Ipswich & Logan. Water damage, fire damage & mould remediation specialists.",
    images: ["/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="canonical" href="https://disasterrecoverybrisbane.com.au" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="geo.region" content="AU-QLD" />
        <meta name="geo.placename" content="Brisbane" />
        <meta name="geo.position" content="-27.4698;153.0251" />
        <meta name="ICBM" content="-27.4698, 153.0251" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}