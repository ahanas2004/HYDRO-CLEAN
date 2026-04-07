import Link from 'next/link'
import { ArrowRight, Droplets } from 'lucide-react'
import { industries, services } from '@/lib/data'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata = { title: 'Industries | Hydroclean Systems' }

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-24 right-24 oil-droplet-lg opacity-25" style={{ animation: 'float 5s ease-in-out infinite' }} />
        <div className="absolute bottom-32 left-16 oil-droplet opacity-20" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1.5s' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="label-sm" style={{ marginBottom: '.75rem' }}>Sectors We Serve</div>
          <h1 className="display-lg" style={{ marginBottom: '1rem' }}>Built for Every <span className="text-gradient">Industry</span></h1>
          <p className="body-lg" style={{ maxWidth: '600px' }}>{"Our filtration systems are engineered and certified for the most demanding industrial sectors across India."}</p>
        </div>
      </section>

      {/* Industries List */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {industries.map((ind, i) => (
            <AnimateOnScroll key={ind.id} delay={i * 60}>
              <div id={ind.id} className="card card-oil" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px), 1fr))' }}>
                <div style={{ padding: 'clamp(1.75rem,4vw,2.5rem)', borderRight: '1px solid var(--border)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, var(--primary-glow), rgba(184, 134, 11, 0.05))', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>{ind.icon}</div>
                  <div>
                    <h2 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 800, fontSize: 'clamp(1rem,2.5vw,1.25rem)', color: 'var(--text)', marginBottom: '.25rem' }}>{ind.title}</h2>
                    <div className="label-sm" style={{ marginBottom: '.75rem' }}>{ind.sub}</div>
                    <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{ind.desc}</p>
                  </div>
                </div>
                <div style={{ padding: 'clamp(1.75rem,4vw,2.5rem)', background: 'var(--bg-elevated)' }}>
                  <div className="label-sm" style={{ marginBottom: '1rem' }}>Applicable Services</div>
                  {services.slice(0, 4).map(s => (
                    <Link 
                      key={s.id} 
                      href={`/services/${s.id}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.7rem 0', borderBottom: '1px solid var(--border)', textDecoration: 'none', transition: 'all .15s' }}
                    >
                      <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.8375rem', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color .15s' }}>{s.short}</span>
                      <ArrowRight size={14} color="var(--primary)" />
                    </Link>
                  ))}
                  <Link href="/contact" className="btn-primary" style={{ marginTop: '1.25rem', width: '100%', justifyContent: 'center', fontSize: '.8125rem', padding: '.75rem' }}>
                    Get Industry Quote
                  </Link>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-oil" style={{ padding: 'clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,4rem)', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Droplets size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: 'white', marginBottom: '1rem' }}>{"Don't"} See Your Industry?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>We design custom solutions for unique industrial challenges.</p>
          <Link href="/contact" className="btn-dark">
            Contact Our Engineers <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
