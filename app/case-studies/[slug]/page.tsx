import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ArrowRight, MapPin, Droplets } from 'lucide-react'
import { caseStudies } from '@/lib/data'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export async function generateStaticParams() {
  return caseStudies.map(cs => ({ slug: cs.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = caseStudies.find(c => c.id === slug)
  return { title: `${cs?.title} | Hydroclean Systems` }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cs = caseStudies.find(c => c.id === slug)
  if (!cs) notFound()

  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-32 right-24 oil-droplet-lg opacity-20" style={{ animation: 'float 5s ease-in-out infinite' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}>
            <ArrowLeft size={14} /> All Case Studies
          </Link>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
            <span className="oil-badge">{cs.tag}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <MapPin size={14} /> {cs.location}
            </span>
          </div>
          <h1 className="display-lg" style={{ marginBottom: '2rem' }}>{cs.title}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(120px, 1fr))`, gap: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
            {cs.metrics.map(m => (
              <div key={m.label}>
                <div className="stat-value" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)' }}>{m.value}</div>
                <div className="label-sm" style={{ marginTop: '0.3rem' }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px), 1fr))', gap: '2rem' }}>
            <AnimateOnScroll>
              <div className="card" style={{ height: '100%' }}>
                <div className="label-sm" style={{ marginBottom: '1rem' }}>The Problem</div>
                <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{cs.problem}</p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <div className="card card-oil" style={{ height: '100%' }}>
                <div className="label-sm" style={{ marginBottom: '1rem' }}>The Solution</div>
                <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.5rem' }}>{cs.solution}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--primary-glow), rgba(184, 134, 11, 0.05))', border: '1px solid rgba(184, 134, 11, 0.2)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                  <Droplets size={16} color="var(--primary)" />
                  <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary-dark)' }}>Hydroclean Solution Deployed</span>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll>
            <div className="card">
              <div className="label-sm" style={{ marginBottom: '1.25rem' }}>Results Achieved</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '0.75rem' }}>
                {cs.results.map(r => (
                  <div key={r} style={{ display: 'flex', gap: '0.75rem', padding: '0.875rem', background: 'var(--success-light)', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                    <CheckCircle size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '1px' }} />
                    <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="cta-oil" style={{ borderRadius: '20px', padding: '2.5rem', textAlign: 'center', position: 'relative' }}>
              <Droplets size={36} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontFamily: '"DM Serif Display",serif', fontSize: '1.75rem', color: 'white', marginBottom: '0.75rem' }}>Want Similar Results?</h3>
              <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>Let our engineers assess your plant and design the right solution.</p>
              <Link href="/contact" className="btn-dark">
                Get Free Assessment <ArrowRight size={16} />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  )
}
