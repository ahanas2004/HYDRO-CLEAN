import Link from 'next/link'
import { ArrowRight, CheckCircle, AlertTriangle, Droplets, Gauge, Shield, Factory, Beaker, Settings, Phone } from 'lucide-react'
import Hero from '@/components/sections/Hero'
import ROICalculator from '@/components/sections/ROICalculator'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import StatCounter from '@/components/ui/StatCounter'
import { services, industries, caseStudies, stats, clients, problems, processSteps } from '@/lib/data'

const pageStyles = `
.trust-client { 
  font-family:"Plus Jakarta Sans",sans-serif; 
  font-weight:700; 
  font-size:.875rem; 
  color:#7A7A7A; 
  letter-spacing:.05em; 
  white-space:nowrap;
  transition: color 0.2s;
}
.trust-client:hover { color: #B8860B; }

.service-card { 
  background: #FFFFFF;
  border: 1px solid var(--border); 
  border-radius: 20px; 
  padding: 1.75rem; 
  height: 100%; 
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
  cursor: pointer; 
  transition: all .4s cubic-bezier(0.16, 1, 0.3, 1); 
  text-decoration: none;
  position: relative;
  overflow: hidden;
}
.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #8B6914, #B8860B, #D4A853);
  opacity: 0;
  transition: opacity 0.4s;
}
.service-card:hover { 
  transform: translateY(-6px); 
  box-shadow: 0 20px 50px rgba(0,0,0,.08), 0 0 40px rgba(184,134,11,0.08);
  border-color: var(--border-dark);
}
.service-card:hover::before { opacity: 1; }

.industry-card { 
  display: flex; 
  gap: 1rem; 
  align-items: flex-start; 
  padding: 1.5rem; 
  border: 1px solid var(--border); 
  border-radius: 16px; 
  background: #FFFFFF;
  transition: all .3s cubic-bezier(0.16, 1, 0.3, 1); 
  text-decoration: none;
}
.industry-card:hover { 
  border-color: #B8860B; 
  background: rgba(184,134,11,0.03); 
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(184,134,11,0.1);
}

.cs-card { 
  background: #FFFFFF;
  border: 1px solid var(--border); 
  border-radius: 20px; 
  padding: 2rem; 
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  gap: 1.25rem; 
  transition: all .4s cubic-bezier(0.16, 1, 0.3, 1);
}
.cs-card:hover { 
  transform: translateY(-6px); 
  box-shadow: 0 20px 50px rgba(0,0,0,.08), 0 0 40px rgba(184,134,11,0.08); 
  border-color: var(--border-dark);
}

.problem-card { 
  background: linear-gradient(145deg, #FFFBF5, #FFF8EE);
  border: 1px solid rgba(184,134,11,0.15); 
  border-radius: 18px; 
  padding: 1.75rem; 
  display: flex; 
  flex-direction: column; 
  gap: .75rem; 
  box-shadow: 0 4px 20px rgba(0,0,0,.04);
  transition: all 0.3s;
}
.problem-card:hover {
  border-color: rgba(184,134,11,0.3);
  box-shadow: 0 8px 30px rgba(0,0,0,.06), 0 0 20px rgba(184,134,11,0.08);
}

.process-step { 
  padding: 2rem 1.5rem; 
  text-align: center;
  position: relative;
}

.final-cta-btn { 
  display: inline-flex; 
  align-items: center; 
  gap: .5rem; 
  background: var(--secondary);
  color: #FFFFFF; 
  font-family: "Plus Jakarta Sans",sans-serif; 
  font-weight: 700; 
  font-size: .9375rem; 
  padding: 1rem 2rem; 
  border-radius: 12px; 
  text-decoration: none; 
  box-shadow: 0 4px 20px rgba(44,62,80,.2);
  border: none;
  transition: all .3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
  overflow: hidden;
}
.final-cta-btn:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 8px 30px rgba(44,62,80,.3);
}

.final-cta-phone { 
  display: inline-flex; 
  align-items: center; 
  gap: .5rem; 
  background: rgba(255,255,255,.15); 
  color: #FFFFFF; 
  font-family: "Plus Jakarta Sans",sans-serif; 
  font-weight: 600; 
  font-size: .9375rem; 
  padding: 1rem 2rem; 
  border-radius: 12px; 
  text-decoration: none; 
  border: 1.5px solid rgba(255,255,255,.25); 
  transition: all .3s;
  backdrop-filter: blur(10px);
}
.final-cta-phone:hover { 
  background: rgba(255,255,255,.25);
  border-color: rgba(255,255,255,.4);
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`

/* --- TRUST BAR --- */
function TrustBar() {
  return (
    <div style={{ 
      background: '#FFFFFF', 
      borderBottom: '1px solid var(--border)', 
      padding: '1rem 0', 
      overflow: 'hidden' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0', width: 'max-content', animation: 'marquee 35s linear infinite' }}>
        {[...clients, ...clients].map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '0 2.5rem', borderRight: '1px solid var(--border)' }}>
            <span className="trust-client">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* --- PROBLEM SECTION --- */
function ProblemSection() {
  return (
    <section style={{ 
      background: 'linear-gradient(180deg, #FFFBF5 0%, var(--bg) 100%)', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)', 
      borderTop: '1px solid rgba(184,134,11,0.1)', 
      borderBottom: '1px solid rgba(184,134,11,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle oil droplet decorations */}
      <div className="absolute top-20 right-16 oil-droplet opacity-20" style={{ animation: 'float 5s ease-in-out infinite' }} />
      <div className="absolute bottom-32 left-12 oil-droplet-sm opacity-15" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }} />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
            <AlertTriangle size={14} />
            The Problem
          </div>
          <h2 className="display-lg" style={{ marginBottom: '1rem' }}>Are You Facing <span className="text-gradient">These Issues</span>?</h2>
          <p className="body-lg" style={{ maxWidth: '520px', margin: '0 auto' }}>Contaminated oil is the #1 cause of industrial equipment failure - yet most plants {"don't"} know it until {"it's"} too late.</p>
        </AnimateOnScroll>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {problems.map((p, i) => (
            <AnimateOnScroll key={p.title} delay={i * 80}>
              <div className="problem-card">
                <span style={{ fontSize: '2rem' }}>{p.icon}</span>
                <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)' }}>{p.title}</h3>
                <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.875rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>{p.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
        <AnimateOnScroll style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '.75rem', 
            background: 'linear-gradient(135deg, rgba(46,125,50,0.08), rgba(46,125,50,0.03))',
            border: '1px solid rgba(46,125,50,0.2)',
            color: 'var(--text)', 
            borderRadius: '14px', 
            padding: '1rem 1.5rem', 
            flexWrap: 'wrap', 
            justifyContent: 'center'
          }}>
            <CheckCircle size={18} color="var(--success)" />
            <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600, fontSize: '.9375rem' }}>Hydroclean solves all of these</span>
            <Link href="/contact" style={{ display: 'flex', alignItems: 'center', gap: '.25rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: 700, fontSize: '.875rem' }}>
              Get Free Diagnosis <ArrowRight size={14} />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

/* --- STATS --- */
function StatsSection() {
  return (
    <section className="cta-oil" style={{ 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll style={{ textAlign: 'center', marginBottom: 'clamp(2rem,4vw,3rem)' }}>
          <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem', color: 'rgba(255,255,255,0.7)' }}>
            <Gauge size={14} />
            Measurable Results
          </div>
          <h2 className="display-lg" style={{ color: '#FFFFFF' }}>Numbers That Matter</h2>
        </AnimateOnScroll>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', 
          gap: '1px', 
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '20px',
          overflow: 'hidden'
        }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'rgba(0,0,0,0.2)', backdropFilter: 'blur(10px)' }}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} icon={s.icon} variant="light" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- SERVICES --- */
function ServicesSection() {
  const iconMap: Record<string, React.ReactNode> = {
    '01': <Settings size={24} />,
    '02': <Beaker size={24} />,
    '03': <Droplets size={24} />,
    '04': <Gauge size={24} />,
    '05': <Shield size={24} />,
    '06': <Factory size={24} />,
  }

  return (
    <section style={{ 
      background: 'var(--bg)', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <AnimateOnScroll>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div>
              <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Droplets size={14} />
                What We Do
              </div>
              <h2 className="display-lg">Complete <span className="text-gradient">Filtration Solutions</span></h2>
            </div>
            <Link href="/services" className="btn-secondary">View All Services <ArrowRight size={16} /></Link>
          </div>
        </AnimateOnScroll>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
          {services.map((s, i) => (
            <AnimateOnScroll key={s.id} delay={i * 60}>
              <Link href={`/services/${s.id}`} className="service-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '52px', 
                    height: '52px', 
                    background: 'linear-gradient(135deg, rgba(184,134,11,0.12), rgba(184,134,11,0.05))',
                    border: '1px solid rgba(184,134,11,0.15)',
                    borderRadius: '14px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)'
                  }}>
                    {iconMap[s.number] || <Droplets size={24} />}
                  </div>
                  <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '2.5rem', color: 'var(--border)', lineHeight: 1 }}>{s.number}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: 'var(--text)', marginBottom: '.375rem' }}>{s.title}</h3>
                  <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.tagline}</p>
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '.375rem', fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600, fontSize: '.8125rem', color: 'var(--success)' }}>
                  <CheckCircle size={14} />{s.result}
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- INDUSTRIES --- */
function IndustriesSection() {
  return (
    <section style={{ 
      background: '#FFFFFF', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <AnimateOnScroll>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div>
              <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Factory size={14} />
                Who We Serve
              </div>
              <h2 className="display-lg">Built for Every <span className="text-gradient">Industry</span></h2>
            </div>
            <Link href="/industries" className="btn-secondary">All Industries <ArrowRight size={16} /></Link>
          </div>
        </AnimateOnScroll>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
          {industries.map((ind, i) => (
            <AnimateOnScroll key={ind.id} delay={i * 60}>
              <Link href={`/industries#${ind.id}`} className="industry-card">
                <span style={{ fontSize: '2rem' }}>{ind.icon}</span>
                <div>
                  <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '.9375rem', color: 'var(--text)', marginBottom: '.25rem' }}>{ind.title}</h3>
                  <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.7rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{ind.sub}</div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- CASE STUDIES --- */
function CaseStudiesSection() {
  return (
    <section style={{ 
      background: 'var(--bg)', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <AnimateOnScroll>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
            <div>
              <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Shield size={14} />
                Case Studies
              </div>
              <h2 className="display-lg">Results That <span className="text-gradient">Speak</span></h2>
            </div>
            <Link href="/case-studies" className="btn-secondary">All Case Studies <ArrowRight size={16} /></Link>
          </div>
        </AnimateOnScroll>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '1.5rem' }}>
          {caseStudies.map((cs, i) => (
            <AnimateOnScroll key={cs.id} delay={i * 80}>
              <Link href={`/case-studies/${cs.id}`} style={{ textDecoration: 'none', display: 'flex', height: '100%' }}>
                <div className="cs-card">
                  <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className="oil-badge" style={{ padding: '.25rem .75rem' }}>{cs.tag}</span>
                    <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.72rem', color: 'var(--text-muted)' }}>{cs.location}</span>
                  </div>
                  <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: 'clamp(1rem,2.5vw,1.125rem)', color: 'var(--text)', lineHeight: 1.35 }}>{cs.title}</h3>
                  <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>{cs.problem.slice(0, 120)}...</p>
                  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cs.metrics.length}, 1fr)`, gap: '.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                    {cs.metrics.map(m => (
                      <div key={m.label}>
                        <div className="stat-value" style={{ fontSize: 'clamp(1.5rem,4vw,2rem)' }}>{m.value}</div>
                        <div style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.62rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.1em', marginTop: '.2rem' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem', color: 'var(--primary)', fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600, fontSize: '.8125rem' }}>
                    Read full case study <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- PROCESS --- */
function ProcessSection() {
  return (
    <section style={{ 
      background: '#FFFFFF', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <AnimateOnScroll style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div className="label-sm" style={{ marginBottom: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem' }}>
            <Settings size={14} />
            Our Process
          </div>
          <h2 className="display-lg">How <span className="text-gradient">It Works</span></h2>
          <p className="body-lg" style={{ maxWidth: '520px', margin: '1rem auto 0' }}>A zero-guesswork approach from first contact to full commissioning - and beyond.</p>
        </AnimateOnScroll>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', 
          gap: '1px', 
          background: 'var(--border)',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.06)'
        }}>
          {processSteps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={i * 100}>
              <div className="process-step" style={{ background: '#FFFFFF' }}>
                <div style={{ 
                  width: '56px', 
                  height: '56px', 
                  margin: '0 auto 1rem', 
                  background: 'linear-gradient(135deg, rgba(184,134,11,0.1), rgba(184,134,11,0.05))',
                  border: '1px solid rgba(184,134,11,0.15)',
                  borderRadius: '16px',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '1.5rem'
                }}>
                  {step.step}
                </div>
                <div style={{ 
                  fontFamily: '"DM Serif Display",serif', 
                  fontSize: '2.5rem', 
                  color: 'var(--border)', 
                  marginBottom: '.5rem' 
                }}>0{i + 1}</div>
                <h3 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '.375rem' }}>{step.title}</h3>
                <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- FINAL CTA --- */
function FinalCTA() {
  return (
    <section className="cta-oil" style={{ 
      padding: 'clamp(4rem,8vw,6rem) clamp(1.25rem,5vw,4rem)',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <AnimateOnScroll>
          <Droplets size={48} color="rgba(255,255,255,0.3)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ 
            fontFamily: '"DM Serif Display",serif', 
            fontSize: 'clamp(2rem,5vw,3rem)', 
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1rem'
          }}>
            Ready to Cut Costs and Extend Equipment Life?
          </h2>
          <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '1.0625rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.65, marginBottom: '2rem' }}>
            Our engineers are ready to assess your plant and design a filtration solution that delivers measurable ROI.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/contact" className="final-cta-btn">
              Get Free Assessment <ArrowRight size={16} />
            </Link>
            <a href="tel:+919840000000" className="final-cta-phone">
              <Phone size={16} />
              +91 98400 00000
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main>
      <style>{pageStyles}</style>
      <Hero />
      <TrustBar />
      <ProblemSection />
      <StatsSection />
      <ServicesSection />
      <ROICalculator />
      <IndustriesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <FinalCTA />
    </main>
  )
}
