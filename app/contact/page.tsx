import { Suspense } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Droplets } from 'lucide-react'
import ContactForm from '@/components/sections/ContactForm'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata = { title: 'Contact | Hydroclean Systems' }

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 98400 00000', href: 'tel:+919840000000' },
  { icon: Mail, label: 'Email', value: 'info@hydrocleansystems.in', href: 'mailto:info@hydrocleansystems.in' },
  { icon: MapPin, label: 'Address', value: 'No. 12, Industrial Estate, Ambattur, Chennai - 600058, Tamil Nadu' },
  { icon: Clock, label: 'Hours', value: 'Mon-Sat: 9 AM - 6 PM | Emergency: 24/7' },
]

const expectations = ['Free on-site assessment', 'Detailed recommendation report', 'No-obligation quote', 'Response within 24 hours']

export default function ContactPage() {
  return (
    <section className="oil-hero-bg relative overflow-hidden" style={{ padding: 'clamp(7rem,12vw,10rem) clamp(1.25rem,5vw,4rem) clamp(3rem,6vw,5rem)', minHeight: '100vh' }}>
      {/* Background decorations */}
      <div className="absolute inset-0 industrial-grid opacity-30 pointer-events-none" />
      <div className="absolute top-32 right-16 oil-droplet-lg opacity-20" style={{ animation: 'float 6s ease-in-out infinite' }} />
      <div className="absolute bottom-48 left-8 oil-droplet opacity-15" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-8 oil-droplet-sm opacity-25" style={{ animation: 'floatSlow 4s ease-in-out infinite', animationDelay: '1s' }} />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,440px), 1fr))', gap: '4rem', alignItems: 'start', position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll>
          <div className="label-sm" style={{ marginBottom: '0.75rem' }}>Get in Touch</div>
          <h1 className="display-lg" style={{ marginBottom: '1rem' }}>{"Let's"} Talk About <span className="text-gradient">Your Plant</span></h1>
          <p className="body-lg" style={{ marginBottom: '2rem' }}>Our engineers are ready to assess your oil filtration challenges and design the right solution. Start with a free, no-obligation consultation.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {contactInfo.map((item, i) => (
              <div key={i} className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, var(--primary-glow), rgba(184, 134, 11, 0.05))', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={20} color="var(--primary)" />
                </div>
                <div>
                  <div className="label-sm" style={{ marginBottom: '0.25rem', fontSize: '0.65rem' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none' }}>{item.value}</a>
                  ) : (
                    <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-oil" style={{ borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(46, 125, 50, 0.2)', background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.05), rgba(46, 125, 50, 0.02))' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Droplets size={18} color="var(--success)" />
              <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '0.9rem', color: 'var(--success)' }}>What to Expect</span>
            </div>
            {expectations.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CheckCircle size={14} color="var(--success)" />
                <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
        
        <AnimateOnScroll delay={120}>
          <div className="card" style={{ padding: 'clamp(1.75rem,4vw,2.5rem)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} color="white" />
              </div>
              <h2 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text)' }}>Submit Your Inquiry</h2>
            </div>
            <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
