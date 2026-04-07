'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Calculator, ArrowRight, Gauge } from 'lucide-react'

export default function ROICalculator() {
  const [machines, setMachines] = useState(10)
  const [oilCost, setOilCost] = useState(50000)
  const [downtime, setDowntime] = useState(8)

  const annualOil = oilCost * 12
  const oilSaving = Math.round(annualOil * 0.4)
  const downtimeCost = downtime * 50000 * 12
  const downtimeSaving = Math.round(downtimeCost * 0.25)
  const totalSaving = oilSaving + downtimeSaving
  const investEst = machines * 25000
  const roi = investEst > 0 ? Math.round((totalSaving / investEst) * 100) : 0

  const SliderInput = ({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
        <label style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', fontWeight: 600, color: '#F5F5F5' }}>{label}</label>
        <span 
          suppressHydrationWarning 
          style={{ 
            fontFamily: '"Plus Jakarta Sans",sans-serif', 
            fontSize: '0.875rem', 
            fontWeight: 700, 
            color: '#D4A853',
            background: 'rgba(212,168,83,0.1)',
            padding: '0.25rem 0.75rem',
            borderRadius: '6px'
          }}
        >
          {unit}{value.toLocaleString('en-IN')}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          style={{ 
            width: '100%', 
            accentColor: '#D4A853', 
            cursor: 'pointer',
            height: '6px',
            borderRadius: '3px',
            background: `linear-gradient(to right, #D4A853 0%, #D4A853 ${((value - min) / (max - min)) * 100}%, #2A2A2E ${((value - min) / (max - min)) * 100}%, #2A2A2E 100%)`
          }} 
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.7rem', color: '#666666', marginTop: '0.375rem' }}>
        <span suppressHydrationWarning>{unit}{min.toLocaleString('en-IN')}</span>
        <span suppressHydrationWarning>{unit}{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  )

  return (
    <section style={{ 
      background: 'linear-gradient(180deg, #0A0A0B 0%, #0D0B09 50%, #0A0A0B 100%)', 
      padding: 'clamp(4rem,8vw,7rem) clamp(1.25rem,5vw,4rem)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background oil flow effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 50%, rgba(212,168,83,0.03) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem,5vw,4rem)' }}>
          <div className="label-sm" style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Calculator size={14} /> ROI Calculator
          </div>
          <h2 className="display-lg text-gradient" style={{ marginBottom: '1rem' }}>Calculate Your Savings</h2>
          <p className="body-lg" style={{ maxWidth: '520px', margin: '0 auto' }}>See exactly how much Hydroclean filtration systems can save your plant - before you invest a single rupee.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,400px), 1fr))', gap: '2rem', alignItems: 'start' }}>
          {/* Inputs */}
          <div style={{ 
            background: 'linear-gradient(145deg, #1A1A1D, #121214)',
            border: '1px solid #2A2A2E',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ 
              fontFamily: '"Plus Jakarta Sans",sans-serif', 
              fontWeight: 700, 
              fontSize: '1rem', 
              color: '#F5F5F5', 
              marginBottom: '1.5rem', 
              paddingBottom: '1rem', 
              borderBottom: '1px solid #2A2A2E',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Gauge size={18} className="text-primary" />
              Your Plant Details
            </h3>
            <SliderInput label="Number of Machines" value={machines} min={1} max={100} step={1} unit="" onChange={setMachines} />
            <SliderInput label="Monthly Oil Cost" value={oilCost} min={10000} max={500000} step={5000} unit="Rs. " onChange={setOilCost} />
            <SliderInput label="Downtime Hours / Month" value={downtime} min={1} max={100} step={1} unit="" onChange={setDowntime} />
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Total saving */}
            <div style={{ 
              background: 'linear-gradient(135deg, #B8912F 0%, #D4A853 50%, #E5C07B 100%)', 
              borderRadius: '24px', 
              padding: '2.5rem 2rem', 
              textAlign: 'center', 
              boxShadow: '0 8px 30px rgba(212,168,83,0.3), 0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Shine effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'oilFlow 4s ease infinite'
              }} />
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(10,10,11,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Estimated Annual Savings</div>
                <div style={{ fontFamily: '"DM Serif Display",serif', fontSize: 'clamp(2.5rem,6vw,4rem)', color: '#0A0A0B', lineHeight: 1, marginBottom: '0.25rem' }}>
                  Rs. {(totalSaving/100000).toFixed(1)}L
                </div>
                <div style={{ fontSize: '0.875rem', color: 'rgba(10,10,11,0.6)' }}>per year</div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ 
              background: 'linear-gradient(145deg, #1A1A1D, #121214)',
              border: '1px solid #2A2A2E',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}>
              <h4 style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700, fontSize: '0.875rem', color: '#F5F5F5', marginBottom: '1rem' }}>Savings Breakdown</h4>
              {[
                { label: 'Oil Cost Reduction (40%)', value: oilSaving, color: '#D4A853' },
                { label: 'Downtime Cost Savings (25%)', value: downtimeSaving, color: '#CD7F32' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.875rem 0', borderBottom: '1px solid #2A2A2E' }}>
                  <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', color: '#A8A8A8' }}>{item.label}</span>
                  <span style={{ fontFamily: '"DM Serif Display",serif', fontSize: '1.25rem', color: item.color }}>Rs. {(item.value/100000).toFixed(1)}L</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', marginTop: '0.25rem' }}>
                <span style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.875rem', fontWeight: 700, color: '#F5F5F5' }}>Estimated ROI</span>
                <span style={{ 
                  fontFamily: '"DM Serif Display",serif', 
                  fontSize: '1.75rem', 
                  background: 'linear-gradient(135deg, #D4A853, #E5C07B)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{roi}%</span>
              </div>
            </div>

            <Link href="/contact" className="btn-primary" style={{ justifyContent: 'center', padding: '1.125rem' }}>
              Get Exact Quote for My Plant <ArrowRight size={16} />
            </Link>
            <p style={{ fontFamily: '"Plus Jakarta Sans",sans-serif', fontSize: '0.75rem', color: '#666666', textAlign: 'center' }}>
              * Estimates based on industry averages. Actual results may vary.
            </p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes oilFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          height: 6px;
          border-radius: 3px;
          outline: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4A853, #E5C07B);
          cursor: pointer;
          border: 3px solid #0A0A0B;
          box-shadow: 0 0 15px rgba(212,168,83,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 0 25px rgba(212,168,83,0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #D4A853, #E5C07B);
          cursor: pointer;
          border: 3px solid #0A0A0B;
          box-shadow: 0 0 15px rgba(212,168,83,0.4);
        }
      `}</style>
    </section>
  )
}