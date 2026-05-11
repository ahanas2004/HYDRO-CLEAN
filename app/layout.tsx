/**
 * Updated Root Layout with Full SEO Infrastructure
 *
 * Changes from original layout.tsx:
 * 1. Static metadata replaced with WP-powered defaults (org schema, site settings)
 * 2. Organization + LocalBusiness JSON-LD injected globally
 * 3. Google / Bing verification tags from WordPress settings
 * 4. OpenGraph locale and type set
 * 5. Viewport meta properly configured for Core Web Vitals
 * 6. Font preloading for LCP optimization
 *
 * Individual pages override everything via their own generateMetadata().
 */

import type { Metadata, Viewport } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Suspense } from 'react'
import { SchemaRenderer } from '@/lib/seo/schema'
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
} from '@/lib/seo/schema'

// ─── Site-wide Metadata Defaults ──────────────────────────────────────────────
// Individual pages call generateMetadata() to override these completely.
// These serve as fallback if a page doesn't export generateMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com'),
  title: {
    default: 'Hydroclean Systems | Industrial Oil Filtration Solutions India',
    template: '%s | Hydroclean Systems',
  },
  description:
    "India's trusted partner for industrial oil filtration. Reduce oil costs by 40%, cut downtime by 25%. ISO certified. Serving Tata, Mahindra, JSW & 500+ plants.",
  keywords: [
    'industrial oil filtration',
    'hydraulic oil purification',
    'coolant management',
    'oil filtration India',
    'Chennai filtration systems',
    'Tata Motors oil filtration',
  ],
  authors: [{ name: 'Hydroclean Systems', url: 'https://hydrocleansystems.com' }],
  creator: 'Hydroclean Systems',
  publisher: 'Hydroclean Systems',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Hydroclean Systems | Clean Oil. Peak Performance.',
    description:
      'Precision filtration systems trusted by Tata Motors, Mahindra, JSW Steel. 18+ years. 500+ installations.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com',
    siteName: 'Hydroclean Systems',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Hydroclean Systems — Industrial Oil Filtration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@HydrocleanSys',
    creator: '@HydrocleanSys',
  },
  // WordPress search engine verification (update values from WP Yoast settings)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFY ?? '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFY ?? '',
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com',
  },
}

// ─── Viewport (separate export as required by Next.js 15+) ────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#B8860B',
}

// ─── Global Organization Schema (injected on every page) ──────────────────────
const orgSchema = buildOrganizationSchema({
  name: 'Hydroclean Systems',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hydrocleansystems.com',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
  phone: process.env.NEXT_PUBLIC_PHONE ?? '+919840000000',
  sameAs: [
    'https://www.linkedin.com/company/hydroclean-systems',
    'https://twitter.com/HydrocleanSys',
    'https://www.facebook.com/HydrocleanSystems',
  ],
})

const localBizSchema = buildLocalBusinessSchema()

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        {/* Preconnect for performance — critical for LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS prefetch for WP API */}
        <link
          rel="dns-prefetch"
          href={process.env.NEXT_PUBLIC_WP_URL ?? 'https://cms.hydrocleansystems.com'}
        />

        {/* Global Organization JSON-LD (appears on every page) */}
        <SchemaRenderer
          extras={[orgSchema, localBizSchema]}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <WhatsAppButton />
        </Suspense>
      </body>
    </html>
  )
}
