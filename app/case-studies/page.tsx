import Link from 'next/link'
import { ArrowRight, Droplets, MapPin } from 'lucide-react'
import { caseStudies } from '@/lib/data'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata = { title: 'Case Studies | Hydroclean Systems' }

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-28 right-20 oil-droplet-lg opacity-25" style={{ animation: 'float 5s ease-in-out infinite' }} />
        <div className="absolute bottom-36 left-12 oil-droplet opacity-20" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="label-sm" style={{ marginBottom: '.75rem' }}>Proven Results</div>
          <h1 className="display-lg" style={{ marginBottom: '1rem' }}>Results That <span className="text-gradient">Speak</span></h1>
          <p className="body-lg" style={{ maxWidth: '600px' }}>{"Real outcomes from real installations across India's most demanding industrial environments."}</p>
        </div>
      </section>

      {/* Case Studies List */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {caseStudies.map((cs, i) => (
            <AnimateOnScroll key={cs.id} delay={i * 80}>
              <Link href={`/case-studies/${cs.id}`} style={{ textDecoration: 'none' }}>
                <div className="card card-oil card-3d" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px), 1fr))' }}>
                  <div style={{ padding: 'clamp(2rem,4vw,2.5rem)', borderRight: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
                      <span className="oil-badge" style={{ padding: '.25rem .75rem' }}>{cs.tag}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.75rem', color: 'var(--text-muted)' }}>
                        <MapPin size={12} /> {cs.location}
                      </span>
                    </div>
                    <h2 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: 'clamp(1rem,2.5vw,1.25rem)', color: 'var(--text)', lineHeight: 1.35, marginBottom: '.875rem' }}>{cs.title}</h2>
                    <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{cs.problem}</p>
                  </div>
                  <div style={{ padding: 'clamp(2rem,4vw,2.5rem)', background: 'var(--bg-elevated)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.metrics.length}, 1fr)`, gap: '1rem' }}>
                      {cs.metrics.map(m => (
                        <div key={m.label}>
                          <div className="stat-value" style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)' }}>{m.value}</div>
                          <div className="label-sm" style={{ marginTop: '.25rem', fontSize: '.6rem' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem', color: 'var(--primary)', fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600, fontSize: '.875rem' }}>
                      View Full Case Study <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-oil" style={{ padding: 'clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,4rem)', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Droplets size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: 'white', marginBottom: '1rem' }}>Want Similar Results?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>{"Let's discuss how we can optimize your oil systems."}</p>
          <Link href="/contact" className="btn-dark">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
