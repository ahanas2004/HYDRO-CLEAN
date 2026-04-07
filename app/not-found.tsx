import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: 'clamp(1.25rem,5vw,4rem)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, #CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.5 }} />
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(6rem,20vw,14rem)', color: '#E2E8F0', lineHeight: 1, marginBottom: '-1rem', userSelect: 'none' }}>404</div>
        <h1 className="display-lg" style={{ marginBottom: '1rem' }}>Page Not <span style={{ color: '#2563EB' }}>Found</span></h1>
        <p className="body-lg" style={{ marginBottom: '2rem', maxWidth: '380px', margin: '0 auto 2rem' }}>The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/" className="btn-primary">Back to Home <ArrowRight size={16} /></Link>
      </div>
    </section>
  )
}
