import Link from 'next/link'
import { ArrowRight, CheckCircle, Droplets, Target, Handshake, TrendingUp, Leaf } from 'lucide-react'
import { stats, clients } from '@/lib/data'
import StatCounter from '@/components/ui/StatCounter'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata = { title: 'About | Hydroclean Systems' }

const values = [
  { icon: Target, title: 'Precision First', desc: 'Every system engineered to exact specifications. We measure, calibrate, and verify.', color: '#B8860B' },
  { icon: Handshake, title: 'Long-Term Partner', desc: "AMC contracts and 24/7 support. We're not a one-time vendor.", color: '#CD7F32' },
  { icon: TrendingUp, title: 'Results Accountability', desc: 'We commit to measurable ROI outcomes in writing.', color: '#8B6914' },
  { icon: Leaf, title: 'Eco-Responsible', desc: 'Reducing oil disposal volumes to help clients meet ESG targets.', color: '#2E7D32' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px), 1fr))', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <div className="label-sm" style={{ marginBottom: '0.75rem' }}>About Us</div>
            <h1 className="display-lg" style={{ marginBottom: '1.25rem' }}>18 Years of Industrial <span className="text-gradient">Filtration Excellence</span></h1>
            <p className="body-lg" style={{ marginBottom: '1.25rem' }}>Founded in 2007, Hydroclean Systems has grown from a specialist filtration service provider to {"India's"} most trusted industrial oil filtration partner.</p>
            <p className="body-md" style={{ marginBottom: '2rem' }}>Our journey began with a single mission: help Indian manufacturers stop losing money to contaminated oil. Today, with 500+ installations across demanding industries, that mission remains unchanged.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">Get a Quote <ArrowRight size={16} /></Link>
              <Link href="/case-studies" className="btn-secondary">View Results</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 80}>
                <div className="card card-3d" style={{ padding: '1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', background: `${v.color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                    <v.icon size={24} color={v.color} />
                  </div>
                  <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text)', marginBottom: '0.375rem' }}>{v.title}</h3>
                  <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px), 1fr))', gap: '0', position: 'relative', zIndex: 1 }}>
          {stats.map(s => (
            <div key={s.label} style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} variant="light" />
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px), 1fr))', gap: '4rem' }}>
          <div>
            <h2 className="display-md" style={{ marginBottom: '1.5rem' }}>Certifications & Standards</h2>
            {['ISO 9001:2015 Certified Quality Management', 'BIS Approved Filtration Systems', 'OEM-Compatible Designs for Major Brands', 'REACH Compliant Filtration Media'].map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                <CheckCircle size={18} color="var(--primary)" />
                <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9375rem', color: 'var(--text)', fontWeight: 500 }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 className="display-md" style={{ marginBottom: '1.5rem' }}>Trusted By</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
              {clients.map(c => (
                <div key={c} className="card" style={{ padding: '1rem', textAlign: 'center', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--text-secondary)' }}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-oil" style={{ padding: 'clamp(3rem,6vw,4rem) clamp(1.25rem,5vw,4rem)', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Droplets size={40} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(1.5rem,3vw,2.25rem)', color: 'white', marginBottom: '1rem' }}>Ready to Optimize Your Oil Systems?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '1.5rem' }}>Get a free consultation with our filtration experts.</p>
          <Link href="/contact" className="btn-dark">
            Contact Us Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
