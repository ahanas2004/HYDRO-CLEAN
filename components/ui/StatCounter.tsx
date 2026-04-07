'use client'
import { useEffect, useRef, useState } from 'react'

interface StatCounterProps {
  value: number
  suffix: string
  label: string
  icon: string
  variant?: 'default' | 'light'
}

export default function StatCounter({ value, suffix, label, icon, variant = 'default' }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const dur = 2000
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * value))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  const isLight = variant === 'light'

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '2rem 1.5rem', position: 'relative' }}>
      {/* Icon */}
      <div style={{ 
        fontSize: '2rem', 
        marginBottom: '0.75rem',
        filter: isLight ? 'none' : 'drop-shadow(0 0 10px rgba(184,134,11,0.3))'
      }}>{icon}</div>
      
      {/* Value */}
      <div style={{ 
        fontFamily: '"DM Serif Display",serif', 
        fontSize: 'clamp(2.5rem,6vw,4rem)', 
        background: isLight 
          ? 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)'
          : 'linear-gradient(135deg, #8B6914 0%, #B8860B 50%, #D4A853 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        lineHeight: 1, 
        fontWeight: 400 
      }}>
        {count}{suffix}
      </div>
      
      {/* Label */}
      <div style={{ 
        fontFamily: '"Plus Jakarta Sans",sans-serif', 
        fontSize: '0.8125rem', 
        fontWeight: 600, 
        color: isLight ? 'rgba(255,255,255,0.85)' : '#7A7A7A', 
        marginTop: '0.5rem', 
        letterSpacing: '0.02em' 
      }}>{label}</div>
      
      {/* Subtle glow effect */}
      {!isLight && (
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '40px',
          background: 'radial-gradient(ellipse, rgba(184,134,11,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(10px)'
        }} />
      )}
    </div>
  )
}
