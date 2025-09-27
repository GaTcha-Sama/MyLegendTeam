import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My Legend Team - Create your legend team",
    template: "%s | My Legend Team"
  },
  description: "Create your legend team in rugby, basketball, football and more ! Intuitive drag & drop interface with more than 1000 professional players. Save and share your formations.",
  keywords: [
    "legend team",
    "rugby",
    "basketball", 
    "football",
    "ice hockey",
    "handball",
    "professional players",
    "formation sportive",
    "drag and drop",
    "sport management",
    "dream team",
    "legend players"
  ],
  authors: [{ name: "My Legend Team" }],
  creator: "My Legend Team",
  publisher: "My Legend Team",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://my-legend-team.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://my-legend-team.vercel.app',
    title: 'My Legend Team - Create your legend team',
    description: 'Create your legend team in rugby, basketball, football and more ! Intuitive drag & drop interface with more than 1000 professional players. Save and share your formations.',
    siteName: 'My Legend Team',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'My Legend Team - Create your legend team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Legend Team - Create your legend team',
    description: 'Create your legend team in rugby, basketball, football and more !',
    images: ['/images/twitter-image.webp'],
    creator: '@mylegendteam',
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
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
