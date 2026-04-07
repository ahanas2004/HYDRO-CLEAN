'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Phone, ArrowRight, Droplets } from 'lucide-react'

const navItems = [
  { label: 'About', href: '/about' },
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Oil Filtration Machines',    href: '/services/oil-filtration-machines',    icon: 'gear' },
      { label: 'Fine Filtration Services',   href: '/services/fine-filtration-services',   icon: 'filter' },
      { label: 'Hydraulic Oil Purification', href: '/services/hydraulic-oil-purification', icon: 'droplet' },
      { label: 'Coolant Management',         href: '/services/coolant-management',         icon: 'temp' },
      { label: 'Oil Condition Monitoring',   href: '/services/oil-condition-monitoring',   icon: 'chart' },
      { label: 'Turnkey Integration',        href: '/services/turnkey-integration',        icon: 'factory' },
    ],
  },
  { label: 'Industries',   href: '/industries' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact',      href: '/contact' },
]

// Service icon component
function ServiceIcon({ type }: { type: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    gear: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    filter: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
    droplet: <Droplets className="w-4 h-4" />,
    temp: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    chart: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    factory: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  }
  return iconMap[type] || <Droplets className="w-4 h-4" />
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openDropdown  = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }
  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <>
      <style>{`
        /* Nav links - Light Oil Theme */
        .hc-nav-link {
          position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 8px 14px; border-radius: 8px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 14px; font-weight: 500;
          color: #4A4A4A; text-decoration: none;
          transition: color .18s, background .18s;
          white-space: nowrap;
        }
        .hc-nav-link:hover { color: #B8860B; background: rgba(184, 134, 11, 0.08); }
        .hc-nav-link.active { color: #B8860B; }

        /* Dropdown panel - Light Theme */
        .hc-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%;
          transform: translateX(-50%);
          background: #FFFFFF;
          border: 1px solid #E8E2D9;
          border-radius: 16px;
          width: 300px;
          padding: 8px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,.06), 0 24px 48px -8px rgba(0,0,0,.12), 0 0 40px rgba(184, 134, 11, 0.05);
          z-index: 200;
          animation: dd-in .2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes dd-in {
          from { opacity:0; transform: translateX(-50%) translateY(-8px) scale(0.95); }
          to   { opacity:1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        /* Dropdown items - Light Theme */
        .hc-dd-item {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 10px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 13.5px; font-weight: 500;
          color: #4A4A4A; text-decoration: none;
          transition: all .2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-dd-item:hover { background: rgba(184, 134, 11, 0.08); color: #8B6914; transform: translateX(4px); }
        .hc-dd-icon {
          width: 32px; height: 32px; border-radius: 10px;
          background: linear-gradient(135deg, #FFF8EE, #FFFBF5);
          border: 1px solid #E8E2D9;
          display: flex; align-items: center; justify-content: center;
          color: #B8860B;
          flex-shrink: 0;
          transition: all .2s;
        }
        .hc-dd-item:hover .hc-dd-icon { 
          background: linear-gradient(135deg, rgba(184, 134, 11, 0.15), rgba(184, 134, 11, 0.08)); 
          border-color: #B8860B;
          box-shadow: 0 0 15px rgba(184, 134, 11, 0.15);
        }

        /* CTA button - Oil Gold */
        .hc-cta {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #D4A853 100%);
          color: #FFFFFF;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-weight: 700; font-size: 13.5px;
          padding: 10px 20px; border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(184,134,11,.25), 0 8px 20px rgba(184,134,11,.15);
          transition: all .25s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .hc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }
        .hc-cta:hover::before {
          transform: translateX(100%);
        }
        .hc-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184,134,11,.35), 0 12px 28px rgba(184,134,11,.2);
        }

        /* Phone link */
        .hc-phone {
          display: flex; align-items: center; gap: 6px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 13px; font-weight: 600; color: #7A7A7A;
          text-decoration: none;
          transition: color .2s;
        }
        .hc-phone:hover { color: #B8860B; }

        /* Mobile drawer - Light Theme */
        .hc-drawer {
          position: fixed; inset: 0; top: 68px;
          background: #FFFFFF;
          z-index: 98;
          overflow-y: auto;
          display: flex; flex-direction: column;
          animation: drawer-in .25s cubic-bezier(.16,1,.3,1);
        }
        @keyframes drawer-in {
          from { opacity:0; transform: translateY(-12px); }
          to   { opacity:1; transform: translateY(0); }
        }

        /* Mobile nav items */
        .hc-mob-item {
          display: block;
          padding: 16px 0;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 18px; font-weight: 600;
          color: #1A1A1A; text-decoration: none;
          border-bottom: 1px solid #E8E2D9;
          transition: color .15s;
        }
        .hc-mob-item:hover { color: #B8860B; }
        .hc-mob-sub {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 0;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 14px; font-weight: 500;
          color: #4A4A4A; text-decoration: none;
          transition: color .15s;
        }
        .hc-mob-sub:hover { color: #B8860B; }

        /* Hamburger lines */
        .hc-burger { display:flex; flex-direction:column; gap:5px; width:22px; }
        .hc-burger span {
          display:block; height:2px; border-radius:2px;
          background: #B8860B; transition:all .25s ease;
        }
        .hc-burger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hc-burger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .hc-burger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        /* responsive hide/show */
        @media (min-width:768px) { .hc-mob-only { display:none !important; } }
        @media (max-width:767px) { .hc-desk-only { display:none !important; } }
        
        /* Shine animation */
        @keyframes shine {
          0%, 100% { left: -100%; }
          50% { left: 100%; }
        }
      `}</style>

      {/* Nav bar */}
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '68px',
          background: scrolled ? 'rgba(251,248,243,.98)' : 'rgba(251,248,243,.90)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? '#E8E2D9' : 'transparent'}`,
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.06), 0 0 40px rgba(184, 134, 11, 0.03)' : 'none',
          transition: 'all .3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{
          maxWidth: '1280px', margin: '0 auto', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 clamp(1rem, 4vw, 3rem)',
          gap: '1.5rem',
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
            {/* Icon mark */}
            <div style={{
              width: '40px', height: '40px', flexShrink: 0,
              background: 'linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #D4A853 100%)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(184,134,11,.25), 0 0 0 1px rgba(184,134,11,.15)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Oil droplet icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C12 2 20 10 20 15C20 19.418 16.418 23 12 23C7.582 23 4 19.418 4 15C4 10 12 2 12 2Z" fill="#FFFFFF" fillOpacity="0.95"/>
                <path d="M12 5C12 5 17 11 17 14.5C17 17.538 14.538 20 12 20C9.462 20 7 17.538 7 14.5C7 11 12 5 12 5Z" fill="#FFFFFF" fillOpacity="0.5"/>
                <ellipse cx="9.5" cy="13" rx="2" ry="3" fill="rgba(184,134,11,0.4)" transform="rotate(-15 9.5 13)"/>
              </svg>
              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shine 3s ease-in-out infinite',
              }} />
            </div>
            {/* Word-mark */}
            <div style={{ lineHeight: 1 }}>
              <div style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 800, fontSize: '16px',
                color: '#1A1A1A', letterSpacing: '-.5px',
              }}>
                HYDROCLEAN
              </div>
              <div style={{
                fontFamily: '"Plus Jakarta Sans", sans-serif',
                fontWeight: 600, fontSize: '9px',
                color: '#B8860B', letterSpacing: '2.5px',
                textTransform: 'uppercase', marginTop: '2px',
              }}>
                Systems India
              </div>
            </div>
          </Link>

          {/* Desktop centre links */}
          <div
            className="hc-desk-only"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}
          >
            {navItems.map(item => (
              <div
                key={item.label}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.children ? openDropdown(item.label) : undefined}
                onMouseLeave={() => item.children ? closeDropdown() : undefined}
              >
                <Link href={item.href} className="hc-nav-link">
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={13}
                      style={{
                        transition: 'transform .2s',
                        transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                        color: '#7A7A7A',
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div
                    className="hc-dropdown"
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={() => closeDropdown()}
                  >
                    {/* View all link at top */}
                    <div style={{
                      padding: '8px 14px 12px',
                      borderBottom: '1px solid #E8E2D9',
                      marginBottom: '6px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '11px', fontWeight: 700, color: '#7A7A7A', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                        Our Services
                      </span>
                      <Link href="/services" style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '11.5px', fontWeight: 600, color: '#B8860B', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => setActiveDropdown(null)}>
                        View all <ArrowRight size={11} />
                      </Link>
                    </div>

                    {item.children.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="hc-dd-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="hc-dd-icon"><ServiceIcon type={c.icon} /></span>
                        <span>{c.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop right CTAs */}
          <div className="hc-desk-only" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
            <a href="tel:+919840000000" className="hc-phone">
              <Phone size={13} />
              +91 98400 00000
            </a>
            <div style={{ width: '1px', height: '20px', background: '#E8E2D9' }} />
            <Link href="/contact" className="hc-cta">
              Get a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="hc-mob-only"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background: 'none', border: 'none',
              cursor: 'pointer', padding: '8px',
              borderRadius: '8px',
              flexShrink: 0,
              transition: 'background .15s',
            }}
          >
            <div className={`hc-burger${mobileOpen ? ' open' : ''}`}>
              <span /><span /><span />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="hc-drawer">
          {/* Quick contact strip */}
          <div style={{
            background: 'rgba(184, 134, 11, 0.08)',
            padding: '12px clamp(1rem,4vw,3rem)',
            display: 'flex', alignItems: 'center', gap: '10px',
            borderBottom: '1px solid rgba(184, 134, 11, 0.15)',
          }}>
            <Phone size={13} color="#B8860B" />
            <a href="tel:+919840000000" style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '13px', fontWeight: 700, color: '#B8860B', textDecoration: 'none' }}>
              +91 98400 00000
            </a>
            <span style={{ color: '#E8E2D9' }}>|</span>
            <a href="mailto:info@hydrocleansystems.in" style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '12px', fontWeight: 500, color: '#7A7A7A', textDecoration: 'none' }}>
              info@hydrocleansystems.in
            </a>
          </div>

          {/* Nav items */}
          <div style={{ padding: '12px clamp(1rem,4vw,3rem)', flex: 1 }}>
            {navItems.map(item => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="hc-mob-item"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div style={{ paddingLeft: '12px', paddingBottom: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
                    {item.children.map(c => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="hc-mob-sub"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span style={{ color: '#B8860B' }}><ServiceIcon type={c.icon} /></span>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTAs */}
          <div style={{
            padding: 'clamp(1rem,3vw,1.5rem) clamp(1rem,4vw,3rem)',
            borderTop: '1px solid #E8E2D9',
            background: '#F7F3ED',
          }}>
            <Link href="/contact" className="hc-cta" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}>
              Get a Free Quote <ArrowRight size={15} />
            </Link>
            <Link href="/contact?audit=true" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              width: '100%', padding: '12px',
              background: 'transparent',
              border: '2px solid #B8860B',
              borderRadius: '10px',
              fontFamily: '"Plus Jakarta Sans",sans-serif',
              fontSize: '14px', fontWeight: 600, color: '#B8860B',
              textDecoration: 'none',
            }}>
              Request Free Filtration Audit
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
