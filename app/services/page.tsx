import Link from 'next/link'
import { ArrowRight, CheckCircle, Droplets } from 'lucide-react'
import { services } from '@/lib/data'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata = { title: 'Services | Hydroclean Systems' }

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-20 right-20 oil-droplet-lg opacity-30" style={{ animation: 'float 5s ease-in-out infinite' }} />
        <div className="absolute bottom-40 left-10 oil-droplet opacity-20" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="label-sm" style={{ marginBottom: '0.75rem' }}>Complete Filtration Solutions</div>
          <h1 className="display-lg" style={{ marginBottom: '1rem' }}>Our <span className="text-gradient">Services</span></h1>
          <p className="body-lg" style={{ maxWidth: '600px' }}>From standalone filtration units to full plant integration - engineered for your specific industrial challenge.</p>
        </div>
      </section>

      {/* Services List */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {services.map((s, i) => (
            <AnimateOnScroll key={s.id} delay={i * 60}>
              <div className="card card-oil" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px), 1fr))' }}>
                <div style={{ padding: 'clamp(2rem,4vw,3rem)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: '56px', height: '56px', background: `${s.color}15`, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{s.icon}</div>
                    <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '3rem', color: 'var(--border)', lineHeight: 1 }}>{s.number}</span>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 800, fontSize: 'clamp(1.125rem,2.5vw,1.375rem)', color: 'var(--text)', marginBottom: '0.5rem' }}>{s.title}</h2>
                    <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.description}</p>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success-light)', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '0.5rem 0.875rem', alignSelf: 'flex-start' }}>
                    <CheckCircle size={14} color="var(--success)" />
                    <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--success)' }}>{s.result}</span>
                  </div>
                  <Link href={`/services/${s.id}`} className="btn-primary" style={{ alignSelf: 'flex-start' }}>Learn More <ArrowRight size={15} /></Link>
                </div>
                <div style={{ padding: 'clamp(2rem,4vw,3rem)', background: 'var(--bg-elevated)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignContent: 'start' }}>
                  <div>
                    <div className="label-sm" style={{ marginBottom: '1rem' }}>Key Features</div>
                    {s.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
                        <div style={{ width: '6px', height: '6px', background: s.color, borderRadius: '50%', flexShrink: 0, marginTop: '7px' }} />
                        <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8375rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="label-sm" style={{ marginBottom: '1rem' }}>Specifications</div>
                    {Object.entries(s.specs || {}).map(([k, v]) => (
                      <div key={k} style={{ marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                        <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{k}</div>
                        <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: s.color, fontWeight: 700 }}>{String(v)}</div>
                      </div>
                    ))}
                  </div>
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
          <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: 'white', marginBottom: '1rem' }}>Need a Custom Solution?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>Our engineers will design a filtration system tailored to your needs.</p>
          <Link href="/contact" className="btn-dark">
            Request Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
