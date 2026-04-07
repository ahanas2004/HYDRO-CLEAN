import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ArrowRight, Droplets } from 'lucide-react'
import { services } from '@/lib/data'

export async function generateStaticParams() {
  return services.map(s => ({ slug: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = services.find(s => s.id === slug)
  return { title: `${s?.title} | Hydroclean Systems` }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find(s => s.id === slug)
  if (!service) notFound()
  const idx = services.findIndex(s => s.id === slug)
  const next = services[(idx + 1) % services.length]

  return (
    <>
      {/* Hero Section */}
      <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)' }}>
        <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
        <div className="absolute top-28 right-16 oil-droplet-lg opacity-20" style={{ animation: 'float 5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '50%', right: '-5%', transform: 'translateY(-50%)', fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(8rem,18vw,16rem)', color: `${service.color}10`, lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>{service.number}</div>
        <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}>
            <ArrowLeft size={14} /> All Services
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <h1 className="display-lg" style={{ flex: 1 }}>{service.title}</h1>
            <span style={{ fontSize: '3rem' }}>{service.icon}</span>
          </div>
          <p className="body-lg" style={{ maxWidth: '600px', marginTop: '1rem' }}>{service.tagline}</p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--success-light)', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '0.5rem 1rem', marginTop: '1.25rem' }}>
            <CheckCircle size={14} color="var(--success)" />
            <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--success)' }}>{service.result}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px), 1fr))', gap: '2rem' }}>
          <div>
            <div className="label-sm" style={{ marginBottom: '1.25rem' }}>About This Service</div>
            <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>{service.description}</p>
            <div className="label-sm" style={{ marginBottom: '1rem' }}>Key Features</div>
            {service.features.map(f => (
              <div key={f} className="card" style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', padding: '0.875rem', alignItems: 'flex-start' }}>
                <CheckCircle size={16} color={service.color} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <div className="label-sm" style={{ marginBottom: '1.25rem' }}>Technical Specifications</div>
              {Object.entries(service.specs || {}).map(([k, v], i, arr) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.875rem 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'capitalize' }}>{k}</span>
                  <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9rem', color: service.color, fontWeight: 700 }}>{String(v)}</span>
                </div>
              ))}
            </div>
            <div className="card-oil" style={{ background: `linear-gradient(135deg, ${service.color}08, ${service.color}03)`, border: `1px solid ${service.color}20`, borderRadius: '16px', padding: '1.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <Droplets size={18} color={service.color} />
                <span className="label-sm" style={{ margin: 0 }}>Ready to get started?</span>
              </div>
              <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.25rem' }}>Get a free site assessment and custom recommendation from our certified engineers.</p>
              <Link href="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Request Free Audit <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Service */}
      <section style={{ borderTop: '1px solid var(--border)', padding: 'clamp(1.5rem,3vw,2rem) clamp(1.25rem,5vw,4rem)', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span className="label-sm">Next Service</span>
          <Link href={`/services/${next.id}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
            <div>
              <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>{next.title}</div>
              <div className="label-sm" style={{ marginTop: '0.25rem' }}>{next.number} of 06</div>
            </div>
            <ArrowRight size={20} color="var(--primary)" />
          </Link>
        </div>
      </section>
    </>
  )
}
