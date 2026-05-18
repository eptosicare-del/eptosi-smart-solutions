import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://eptosismartsolutions.com'),
  title: {
    default: 'Eptosi Smart Solutions — Smart IoT & Automation Solutions for the Future',
    template: '%s | Eptosi Smart Solutions',
  },
  description:
    'Eptosi Smart Solutions — part of Eptosi Group — builds intelligent IoT ecosystems, smart automation systems, AI-based automation, water automation, smart agriculture, and industrial IoT solutions. Serving clients across India.',
  keywords: [
    'IoT Solutions Chennai',
    'Smart Automation India',
    'Plant Watering Automation',
    'Smart Irrigation Systems',
    'IoT Development Company',
    'eptoFlow',
    'Smart Agriculture IoT',
    'Industrial IoT India',
    'Embedded Systems',
    'Water Automation',
    'AI Automation India',
    'Eptosi Smart Solutions',
    'Eptosi Group',
  ],
  authors: [{ name: 'Eptosi Smart Solutions', url: 'https://eptosismartsolutions.com' }],
  creator: 'Eptosi Smart Solutions',
  publisher: 'Eptosi Group',
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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://eptosismartsolutions.com',
    siteName: 'Eptosi Smart Solutions',
    title: 'Eptosi Smart Solutions — Smart IoT & Automation Solutions for the Future',
    description:
      'Engineering smarter futures with IoT & Automation. Intelligent automation ecosystems for homes, agriculture and industries.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eptosi Smart Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eptosi Smart Solutions — Smart IoT & Automation',
    description:
      'Engineering smarter futures with IoT & Automation.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#030712" />
        <link rel="canonical" href="https://eptosismartsolutions.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Eptosi Smart Solutions',
              url: 'https://eptosismartsolutions.com',
              logo: 'https://eptosismartsolutions.com/logo.png',
              description:
                'Smart IoT & Automation Solutions for the Future. Part of Eptosi Group of Companies.',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'contact@eptosismartsolutions.com',
                areaServed: 'IN',
                availableLanguage: ['English', 'Tamil'],
              },
              sameAs: [
                'https://eptosismartsolutions.com',
              ],
              parentOrganization: {
                '@type': 'Organization',
                name: 'Eptosi Group',
              },
            }),
          }}
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
