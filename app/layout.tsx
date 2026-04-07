import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Hydroclean Systems | Industrial Oil Filtration Solutions India',
  description: "India's trusted partner for industrial oil filtration. Reduce oil costs by 40%, cut downtime by 25%. ISO certified. Serving Tata, Mahindra, JSW & 500+ plants.",
  keywords: 'industrial oil filtration, hydraulic oil purification, coolant management, oil filtration India, Chennai',
  openGraph: {
    title: 'Hydroclean Systems | Clean Oil. Peak Performance.',
    description: 'Precision filtration systems trusted by Tata Motors, Mahindra, JSW Steel. 18+ years. 500+ installations.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
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
