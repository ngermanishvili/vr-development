import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VR Holding - Premium Real Estate Development in Georgia",
  description: "VR Holding is Georgia's leading real estate development company, creating luxury residential and resort projects including VR Shekvetili Forest Beach, VR Krtsanisi Resort, and premium developments in Tbilisi.",
  keywords: "VR Holding, real estate Georgia, luxury development, Shekvetili resort, Georgian properties, premium real estate, Tbilisi development, resort development, luxury apartments Georgia",
  authors: [{ name: "VR Holding" }],
  creator: "VR Holding",
  publisher: "VR Holding",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vrholding.ge'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ka-GE': '/ka-GE',
    },
  },
  openGraph: {
    title: "VR Holding - Premium Real Estate Development in Georgia",
    description: "Discover luxury real estate projects by VR Holding, Georgia's premier development company. From beachfront resorts to urban towers, we create exceptional living experiences.",
    url: 'https://vrholding.ge',
    siteName: 'VR Holding',
    images: [
      {
        url: '/landing/hero/landing_banner.png',
        width: 1200,
        height: 630,
        alt: 'VR Holding - Luxury Real Estate Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VR Holding - Premium Real Estate Development in Georgia",
    description: "Georgia's leading real estate developer creating luxury residential and resort projects.",
    images: ['/landing/hero/landing_banner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

// Force dynamic rendering in development
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
