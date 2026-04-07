import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowRight, Droplets } from 'lucide-react'

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-link { 
          color: #4A4A4A; 
          text-decoration: none; 
          font-size: .875rem; 
          font-family: "Plus Jakarta Sans",sans-serif; 
          transition: all .2s; 
          display: flex; 
          align-items: center; 
          gap: .5rem; 
          padding: .3rem 0; 
        }
        .footer-link:hover { color: #B8860B; transform: translateX(4px); }
        .footer-bottom-link { 
          font-size: .75rem; 
          color: #7A7A7A; 
          text-decoration: none; 
          transition: color .2s; 
        }
        .footer-bottom-link:hover { color: #B8860B; }
        .footer-cta-btn { 
          display: inline-flex; 
          align-items: center; 
          gap: .5rem; 
          background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
          color: #FFFFFF; 
          font-family: "Plus Jakarta Sans",sans-serif; 
          font-weight: 700; 
          font-size: .875rem; 
          padding: 1rem 2rem; 
          border-radius: 12px; 
          text-decoration: none; 
          box-shadow: 0 4px 20px rgba(44,62,80,.2);
          border: none;
          transition: all .3s cubic-bezier(0.16, 1, 0.3, 1); 
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
        }
        .footer-cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .footer-cta-btn:hover::before {
          transform: translateX(100%);
        }
        .footer-cta-btn:hover { 
          transform: translateY(-2px); 
          box-shadow: 0 8px 30px rgba(44,62,80,.3);
        }
      `}</style>

      <footer style={{ background: '#F7F3ED', color: '#4A4A4A' }}>
        {/* CTA Band - Oil Golden Gradient */}
        <div className="cta-oil" style={{ 
          padding: 'clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,4rem)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(1.5rem,4vw,2.25rem)', color: '#FFFFFF', lineHeight: 1.15 }}>Start With a Free Filtration Audit</div>
              <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.9375rem', color: 'rgba(255,255,255,.85)', marginTop: '.375rem' }}>No cost. No obligation. Just clarity on your oil management.</div>
            </div>
            <Link href="/contact?audit=true" className="footer-cta-btn">
              Request Free Audit <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Main grid */}
        <div style={{ padding: 'clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,4rem)', maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  background: 'linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #D4A853 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(184,134,11,.2)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C12 2 20 10 20 15C20 19.418 16.418 23 12 23C7.582 23 4 19.418 4 15C4 10 12 2 12 2Z" fill="#FFFFFF" fillOpacity="0.95"/>
                    <ellipse cx="9.5" cy="13" rx="2" ry="3" fill="rgba(184,134,11,0.4)" transform="rotate(-15 9.5 13)"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 800, fontSize: '1rem', color: '#1A1A1A', letterSpacing: '-.01em' }}>HYDROCLEAN</div>
                  <div style={{ fontSize: '.6rem', fontWeight: 600, color: '#B8860B', letterSpacing: '.15em', textTransform: 'uppercase' }}>Systems Pvt Ltd</div>
                </div>
              </div>
              <p style={{ fontSize: '.875rem', lineHeight: 1.7, marginBottom: '1.5rem', color: '#7A7A7A' }}>
                {"India's trusted industrial oil filtration partner - keeping your machinery running cleaner and longer."}
              </p>
              <div className="oil-badge" style={{ fontSize: '.65rem' }}>
                ISO 9001:2015 CERTIFIED
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#B8860B', marginBottom: '1.25rem' }}>Quick Links</div>
              {([['Home', '/'], ['About', '/about'], ['Services', '/services'], ['Industries', '/industries'], ['Case Studies', '/case-studies'], ['Contact', '/contact']] as [string, string][]).map(([label, href]) => (
                <Link key={href} href={href} className="footer-link">
                  <ArrowRight size={11} style={{ opacity: .5, color: '#B8860B' }} />{label}
                </Link>
              ))}
            </div>

            {/* Services */}
            <div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#B8860B', marginBottom: '1.25rem' }}>Services</div>
              {([
                ['Oil Filtration Machines', '/services/oil-filtration-machines'],
                ['Fine Filtration', '/services/fine-filtration-services'],
                ['Hydraulic Purification', '/services/hydraulic-oil-purification'],
                ['Coolant Management', '/services/coolant-management'],
                ['Oil Monitoring', '/services/oil-condition-monitoring'],
                ['Turnkey Integration', '/services/turnkey-integration'],
              ] as [string, string][]).map(([label, href]) => (
                <Link key={href} href={href} className="footer-link">
                  <ArrowRight size={11} style={{ opacity: .5, color: '#B8860B' }} />{label}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.15em', textTransform: 'uppercase', color: '#B8860B', marginBottom: '1.25rem' }}>Contact</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '.75rem', fontSize: '.875rem', color: '#4A4A4A', alignItems: 'flex-start', lineHeight: 1.6 }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '10px', 
                    background: 'linear-gradient(135deg, rgba(184,134,11,.1), rgba(184,134,11,.05))', 
                    border: '1px solid rgba(184,134,11,.15)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <MapPin size={14} color="#B8860B" />
                  </div>
                  <span>No. 12, Industrial Estate, Ambattur, Chennai - 600058</span>
                </div>
                <a href="tel:+919840000000" style={{ display: 'flex', gap: '.75rem', color: '#4A4A4A', textDecoration: 'none', fontSize: '.875rem', alignItems: 'center', transition: 'color .2s' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '10px', 
                    background: 'linear-gradient(135deg, rgba(184,134,11,.1), rgba(184,134,11,.05))', 
                    border: '1px solid rgba(184,134,11,.15)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone size={14} color="#B8860B" />
                  </div>
                  +91 98400 00000
                </a>
                <a href="mailto:info@hydrocleansystems.in" style={{ display: 'flex', gap: '.75rem', color: '#4A4A4A', textDecoration: 'none', fontSize: '.875rem', alignItems: 'center', transition: 'color .2s' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '10px', 
                    background: 'linear-gradient(135deg, rgba(184,134,11,.1), rgba(184,134,11,.05))', 
                    border: '1px solid rgba(184,134,11,.15)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={14} color="#B8860B" />
                  </div>
                  info@hydrocleansystems.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #E8E2D9', padding: '1.5rem clamp(1.25rem,5vw,4rem)', background: '#FFFFFF' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '.75rem', color: '#7A7A7A' }}>
              2025 Hydroclean Systems Pvt. Ltd. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="#" className="footer-bottom-link">Privacy Policy</Link>
              <Link href="#" className="footer-bottom-link">Terms of Use</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
