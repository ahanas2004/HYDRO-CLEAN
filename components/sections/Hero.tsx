'use client'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Shield, Zap, Award } from 'lucide-react'

const sequences = [
  { text: 'Reduce Oil Costs by 40%', sub: 'Advanced filtration extends oil life 3–5× longer' },
  { text: 'Precision 1-Micron Filtration', sub: 'Remove particles invisible to the naked eye' },
  { text: 'Cut Downtime by 25%', sub: 'Prevent contamination-driven equipment failure' },
]
// Deterministic data arrays to prevent React SSR hydration mismatches
const DIRTY_PARTICLES = [
  { x: 25, y1: 150, y2: 90, r: 2.5, dur: 3.5, del: 0 },
  { x: 45, y1: 180, y2: 110, r: 3.5, dur: 4.2, del: 1 },
  { x: 75, y1: 130, y2: 80, r: 2.0, dur: 3.1, del: 0.5 },
  { x: 15, y1: 110, y2: 60, r: 4.0, dur: 5.0, del: 2 },
  { x: 60, y1: 170, y2: 100, r: 1.5, dur: 2.8, del: 1.5 },
  { x: 85, y1: 190, y2: 120, r: 3.0, dur: 4.5, del: 0.2 },
  { x: 35, y1: 140, y2: 70, r: 2.2, dur: 3.8, del: 0.8 },
  { x: 65, y1: 100, y2: 50, r: 2.8, dur: 4.0, del: 1.2 }
]

const CLEAN_BUBBLES = [
  { x: 20, y1: 220, y2: 60, r: 1.5, dur: 2.1, del: 0.2 },
  { x: 40, y1: 230, y2: 70, r: 2.5, dur: 1.8, del: 0.8 },
  { x: 60, y1: 210, y2: 50, r: 1.8, dur: 2.5, del: 1.5 },
  { x: 80, y1: 240, y2: 80, r: 2.0, dur: 2.2, del: 0.5 },
  { x: 30, y1: 215, y2: 55, r: 1.2, dur: 1.9, del: 1.1 },
  { x: 50, y1: 225, y2: 65, r: 3.0, dur: 2.4, del: 0.4 },
  { x: 70, y1: 235, y2: 75, r: 2.2, dur: 2.0, del: 1.8 },
  { x: 25, y1: 205, y2: 45, r: 1.6, dur: 2.6, del: 0.9 },
  { x: 55, y1: 245, y2: 85, r: 2.8, dur: 1.7, del: 1.3 },
  { x: 75, y1: 218, y2: 58, r: 1.4, dur: 2.3, del: 0.7 }
]

function OilFiltrationTank({ className = '' }: { className?: string }) {
  // ...
  const [isSystemActive, setIsSystemActive] = useState(true)

  // Animation variants & transitions
  const springConfig = { type: 'spring' as const, stiffness: 100, damping: 15 }
  const fluidLoopTransition = { repeat: Infinity, duration: 4, ease: 'easeInOut' }
  const drainTransition = { type: 'spring' as const, stiffness: 60, damping: 20 }

  return (
    <svg
      viewBox="0 0 400 480"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{
        filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.5))',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Deep 3D Brushed Metal Gradient */}
        <linearGradient id="metalCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2A3234" />
          <stop offset="10%" stopColor="#5A6668" />
          <stop offset="35%" stopColor="#E5EAEB" />
          <stop offset="65%" stopColor="#8A9A9C" />
          <stop offset="85%" stopColor="#3A4648" />
          <stop offset="100%" stopColor="#1A2022" />
        </linearGradient>

        <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1A2426" />
          <stop offset="50%" stopColor="#4A5A5C" />
          <stop offset="100%" stopColor="#0F1618" />
        </linearGradient>

        {/* Enhanced Oil Gradients */}
        <linearGradient id="dirtyOil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#382210" />
          <stop offset="50%" stopColor="#1C1005" />
          <stop offset="100%" stopColor="#0A0501" />
        </linearGradient>

        <linearGradient id="cleanOil" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="bronzeG" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Thick Glass reflection gradient */}
        <linearGradient id="glassGlare" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="70%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
        </linearGradient>

        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="innerShadow">
          <feOffset dx="0" dy="5" />
          <feGaussianBlur stdDeviation="6" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="black" floodOpacity="0.85" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Base Floor Shadow */}
      <ellipse cx="200" cy="445" rx="140" ry="22" fill="rgba(0,0,0,0.6)" filter="blur(10px)" />
      <ellipse cx="200" cy="442" rx="95" ry="12" fill="rgba(0,0,0,0.9)" filter="blur(4px)" />

      {/* Main Tank Body */}
      <path
        d="M85 105 L85 370 Q85 410 145 410 L255 410 Q315 410 315 370 L315 105 Q315 65 255 65 L145 65 Q85 65 85 105 Z"
        fill="url(#metalCylinder)"
        stroke="#1A2426"
        strokeWidth="2"
      />

      {/* Tank Top Lid / Rim */}
      <ellipse cx="200" cy="68" rx="115" ry="22" fill="url(#metalCylinder)" stroke="#1A2426" strokeWidth="2" />
      <ellipse cx="200" cy="63" rx="95" ry="18" fill="url(#metalDark)" />
      <ellipse cx="200" cy="61" rx="72" ry="13" fill="#0F1618" stroke="#2A3C3E" strokeWidth="1" />

      {/* Industrial Lid Bolts */}
      {[120, 160, 200, 240, 280].map((cx, i) => (
        <g key={i}>
          <circle cx={cx} cy="58" r="4.5" fill="#0F1618" />
          <circle cx={cx} cy="57" r="3" fill="#7A8A8C" />
        </g>
      ))}

      {/* --- INLET & OUTLET PIPES --- */}
      <rect x="20" y="190" width="65" height="28" rx="6" fill="url(#metalCylinder)" stroke="#1A2426" strokeWidth="1.5" />
      <rect x="15" y="186" width="12" height="36" rx="2" fill="url(#metalDark)" />
      <text x="50" y="208" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="800" fill="#0F1618">IN</text>

      <rect x="315" y="190" width="65" height="28" rx="6" fill="url(#metalCylinder)" stroke="#1A2426" strokeWidth="1.5" />
      <rect x="373" y="186" width="12" height="36" rx="2" fill="url(#metalDark)" />
      <text x="345" y="208" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="10" fontWeight="800" fill="#0F1618">OUT</text>

      {/* --- SIGHT GLASS FRAMES & CHAMBERS --- */}
      
      {/* DIRTY CHAMBER */}
      <g transform="translate(95, 125)">
        <rect x="0" y="0" width="95" height="240" rx="15" fill="url(#metalDark)" stroke="#0F1618" strokeWidth="2" />
        <rect x="6" y="6" width="83" height="228" rx="10" fill="#0A0E17" filter="url(#innerShadow)" />
        <text x="47" y="24" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="800" fill="#4B5563" letterSpacing="2">DIRTY</text>
        
        <mask id="dirtyMask">
          <rect x="6" y="30" width="83" height="204" rx="8" fill="white" />
        </mask>
        
        <g mask="url(#dirtyMask)">
          {/* Main Dirty Fluid */}
          <motion.rect 
            x="0" 
            width="100" 
            height="200" 
            fill="url(#dirtyOil)"
            initial={{ y: 40 }}
            animate={isSystemActive ? { y: [40, 35, 40] } : { y: 220 }}
            transition={isSystemActive ? fluidLoopTransition : drainTransition}
          />
          {/* Sludge Particles */}
          {DIRTY_PARTICLES.map((p, i) => (
            <motion.circle 
              key={i} 
              cx={p.x} 
              r={p.r} 
              fill="#050200" 
              initial={{ cy: p.y1, opacity: 0 }}
              animate={
                isSystemActive 
                  ? { cy: [p.y1, p.y2, p.y1], opacity: [0.3, 0.7, 0.3] } 
                  : { cy: p.y1 + 50, opacity: 0 }
              }
              transition={
                isSystemActive 
                  ? { repeat: Infinity, duration: p.dur, delay: p.del, ease: "easeInOut" }
                  : { duration: 0.8, ease: "easeOut" }
              }
            />
          ))}
        </g>
        {/* Glass Glare */}
        <rect x="6" y="6" width="83" height="228" rx="10" fill="url(#glassGlare)" />
      </g>

      {/* CLEAN CHAMBER */}
      <g transform="translate(210, 125)">
        <rect x="0" y="0" width="95" height="240" rx="15" fill="url(#metalDark)" stroke="#0F1618" strokeWidth="2" />
        <rect x="6" y="6" width="83" height="228" rx="10" fill="#0A0E17" filter="url(#innerShadow)" />
        <text x="47" y="24" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="11" fontWeight="800" fill="#FBBF24" letterSpacing="2" filter="url(#glowFilter)">CLEAN</text>
        
        <mask id="cleanMask">
          <rect x="6" y="30" width="83" height="204" rx="8" fill="white" />
        </mask>
        
        <g mask="url(#cleanMask)">
          {/* Main Clean Fluid */}
          <motion.rect 
            x="0" 
            width="100" 
            height="200" 
            fill="url(#cleanOil)"
            initial={{ y: 40 }}
            animate={isSystemActive ? { y: [42, 38, 42] } : { y: 220 }}
            transition={isSystemActive ? fluidLoopTransition : drainTransition}
          />
          {/* Golden Bubbles */}
          {CLEAN_BUBBLES.map((b, i) => (
            <motion.circle 
              key={i} 
              cx={b.x} 
              r={b.r} 
              fill="#FEF08A" 
              initial={{ cy: b.y1, opacity: 0 }}
              animate={
                isSystemActive 
                  ? { cy: [b.y1, b.y2], opacity: [0, 0.9, 0] } 
                  : { cy: b.y1, opacity: 0 }
              }
              transition={
                isSystemActive 
                  ? { repeat: Infinity, duration: b.dur, delay: b.del, ease: "easeOut" }
                  : { duration: 0.5 }
              }
            />
          ))}
        </g>
        {/* Glass Glare */}
        <rect x="6" y="6" width="83" height="228" rx="10" fill="url(#glassGlare)" />
      </g>

      {/* --- CENTRAL FILTER CARTRIDGE --- */}
      <g transform="translate(190, 150)">
        <rect x="0" y="0" width="20" height="190" rx="4" fill="url(#bronzeG)" stroke="#78350F" strokeWidth="2" />
        {/* Pleated Mesh Effect */}
        {[...Array(22)].map((_, i) => (
          <line key={i} x1="2" y1={8 + i * 8} x2="18" y2={8 + i * 8} stroke="#451A03" strokeWidth="2" opacity="0.6" />
        ))}
        <line x1="10" y1="4" x2="10" y2="186" stroke="#FEF08A" strokeWidth="1" opacity="0.4" />
      </g>

      {/* --- GAUGES --- */}
      {/* Left Gauge (Dirty Pressure) */}
      <g transform="translate(122, 98)">
        <circle cx="0" cy="0" r="22" fill="#1A2426" filter="url(#innerShadow)" />
        <circle cx="0" cy="0" r="19" fill="#F1F5F9" stroke="url(#bronzeG)" strokeWidth="4" />
        <circle cx="0" cy="0" r="15" fill="none" stroke="#64748B" strokeWidth="3" strokeDasharray="2 4.2" />
        
        {/* Dynamic Needle */}
        <motion.line 
          x1="0" y1="0" x2="0" y2="-12" 
          stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" 
          initial={{ rotate: 45 }}
          animate={{ rotate: isSystemActive ? 45 : -60 }}
          transition={springConfig}
        />
        
        <circle cx="0" cy="0" r="3.5" fill="#0F172A" />
        <text x="0" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#475569">PSI</text>
      </g>

      {/* Right Gauge (Clean Pressure) */}
      <g transform="translate(278, 98)">
        <circle cx="0" cy="0" r="22" fill="#1A2426" filter="url(#innerShadow)" />
        <circle cx="0" cy="0" r="19" fill="#F1F5F9" stroke="url(#bronzeG)" strokeWidth="4" />
        <circle cx="0" cy="0" r="15" fill="none" stroke="#64748B" strokeWidth="3" strokeDasharray="2 4.2" />
        
        {/* Dynamic Needle */}
        <motion.line 
          x1="0" y1="0" x2="0" y2="-12" 
          stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" 
          initial={{ rotate: 20 }}
          animate={{ rotate: isSystemActive ? 20 : -60 }}
          transition={springConfig}
        />
        
        <circle cx="0" cy="0" r="3.5" fill="#0F172A" />
        <text x="0" y="10" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="7" fontWeight="800" fill="#475569">PSI</text>
      </g>

      {/* --- INTERACTIVE CONTROL PANEL --- */}
      <motion.g 
        transform="translate(135, 385)" 
        onClick={() => setIsSystemActive(!isSystemActive)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: 'pointer' }}
      >
        <rect x="0" y="0" width="130" height="36" rx="8" fill="#0B111A" stroke="#1F2937" strokeWidth="2" filter="url(#innerShadow)" />
        
        {/* Status LEDs */}
        <motion.circle 
          cx="20" cy="18" r="5" 
          animate={{ 
            fill: isSystemActive ? "#22C55E" : "#1F2937",
            opacity: isSystemActive ? [1, 0.6, 1] : 1
          }} 
          transition={isSystemActive ? { repeat: Infinity, duration: 1.5 } : {}}
          filter={isSystemActive ? "url(#glowFilter)" : "none"} 
        />
        <motion.circle 
          cx="36" cy="18" r="5" 
          animate={{ 
            fill: isSystemActive ? "#1F2937" : "#EF4444",
          }} 
          filter={!isSystemActive ? "url(#glowFilter)" : "none"} 
        />
        
        {/* Digital Screen */}
        <motion.rect 
          x="58" y="8" width="60" height="20" rx="3" 
          animate={{
            fill: isSystemActive ? "#064E3B" : "#450A0A",
            stroke: isSystemActive ? "#047857" : "#7F1D1D"
          }}
          strokeWidth="1" 
        />
        <motion.text 
          x="88" y="21" 
          textAnchor="middle" 
          fontFamily="monospace" 
          fontSize="10" 
          fontWeight="bold" 
          animate={{ fill: isSystemActive ? "#34D399" : "#FCA5A5" }}
          filter="url(#glowFilter)"
        >
          {isSystemActive ? "SYS OK" : "OFF"}
        </motion.text>
      </motion.g>

      {/* --- LOGO / BRANDING --- */}
      <text x="200" y="455" textAnchor="middle" fontFamily="Georgia,serif" fontSize="18" fontWeight="800" fill="#FBBF24" letterSpacing="4">HYDROCLEAN</text>
      <text x="200" y="470" textAnchor="middle" fontFamily="system-ui,sans-serif" fontSize="9" fontWeight="700" fill="#6B7280" letterSpacing="2">SYSTEMS INDIA</text>
    </svg>
  )
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [seqIdx, setSeqIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setSeqIdx(i => (i + 1) % sequences.length)
        setFade(true)
      }, 300)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const current = sequences[seqIdx]

  return (
    <>
      <style>{`
        @keyframes hc-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes hc-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hc-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .hc-section {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 1280px;
          margin: 0 auto;
          padding-left: clamp(1.5rem, 5vw, 4rem);
          padding-right: clamp(1.5rem, 5vw, 4rem);
          align-items: center;
          column-gap: clamp(2rem, 4vw, 3rem);
        }
        .hc-left {
          padding-top: clamp(3rem, 8vw, 6rem);
          padding-bottom: clamp(3rem, 8vw, 6rem);
          display: flex;
          flex-direction: column;
        }
        .hc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(184,134,11,0.08);
          border: 1px solid rgba(184,134,11,0.25);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #B8860B;
          letter-spacing: 0.03em;
          margin-bottom: 1.75rem;
          width: fit-content;
        }
        .hc-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #B8860B;
          flex-shrink: 0;
        }
        .hc-badge-sep { color: rgba(184,134,11,0.4); margin: 0 2px; }
        .hc-h1 {
          font-family: var(--font-display, Georgia, serif);
          font-size: clamp(2.4rem, 4.5vw, 3.6rem);
          font-weight: 800;
          line-height: 1.08;
          color: #1A1209;
          margin-bottom: 0;
        }
        .hc-highlight { color: #B8860B; font-style: italic; }
        .hc-seq-wrap {
          height: 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 1.25rem 0 1.5rem;
          padding: 1rem 1.25rem;
          background: rgba(184,134,11,0.055);
          border-left: 3px solid #B8860B;
          border-radius: 0 8px 8px 0;
          flex-shrink: 0;
        }
        .hc-seq-text {
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          font-weight: 700;
          color: #B8860B;
          letter-spacing: -0.01em;
          line-height: 1.2;
          transition: opacity 0.3s, transform 0.3s;
        }
        .hc-seq-sub {
          font-size: 13px;
          color: #8B7355;
          font-weight: 500;
          margin-top: 3px;
          transition: opacity 0.3s, transform 0.3s;
        }
        .hc-trust-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #8B7355;
          margin-bottom: 8px;
        }
        .hc-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 1.75rem;
        }
        .hc-pill {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #2C2010;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(184,134,11,0.18);
          padding: 4px 10px;
          border-radius: 4px;
        }
        .hc-cta-row {
          display: flex;
          gap: 12px;
          margin-bottom: 1.75rem;
          flex-wrap: wrap;
          align-items: center;
        }
        .hc-btn-p {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #B8860B;
          color: white;
          border: none;
          padding: 14px 26px;
          border-radius: 8px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .hc-btn-p:hover { background: #9a710a; transform: translateY(-1px); }
        .hc-btn-s {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          color: #B8860B;
          border: 1.5px solid #B8860B;
          padding: 14px 26px;
          border-radius: 8px;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.01em;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .hc-btn-s:hover { background: rgba(184,134,11,0.06); }
        .hc-trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(184,134,11,0.18);
        }
        .hc-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: #2C2010;
          font-weight: 500;
        }
        .hc-right {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .hc-tank-wrap {
          position: relative;
          width: 100%;
          max-width: 460px;
          aspect-ratio: 1 / 1;
        }
        .hc-glow {
          position: absolute;
          inset: -10%;
          background: radial-gradient(ellipse at center, rgba(184,134,11,0.13) 0%, transparent 65%);
          border-radius: 50%;
          animation: hc-float 4s ease-in-out infinite;
          pointer-events: none;
        }
        .hc-stat {
          position: absolute;
          background: white;
          border: 1px solid rgba(184,134,11,0.22);
          border-radius: 12px;
          padding: 12px 16px;
          z-index: 5;
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          min-width: 110px;
        }
        .hc-stat-val {
          font-family: var(--font-display, Georgia, serif);
          font-size: 22px;
          font-weight: 800;
          color: #B8860B;
          line-height: 1;
        }
        .hc-stat-lbl {
          font-size: 11px;
          font-weight: 600;
          color: #8B7355;
          margin-top: 4px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .hc-tank-inner {
          position: absolute;
          top: 4%; bottom: 4%;
          left: 10%; right: 10%;
        }
        .hc-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 600;
          color: #8B7355;
          pointer-events: none;
        }
        .hc-bounce { animation: hc-bounce 2s ease-in-out infinite; }
        .hc-ticker {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #1A1209;
          height: 40px;
          display: flex;
          align-items: center;
          overflow: hidden;
          z-index: 50;
        }
        .hc-ticker-track {
          display: flex;
          gap: 3rem;
          white-space: nowrap;
          animation: hc-ticker 28s linear infinite;
        }
        .hc-ticker-item {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        .hc-ticker-dot { color: #D4A853; margin-right: 0.6rem; }
        @media (max-width: 900px) {
          .hc-section { grid-template-columns: 1fr; }
          .hc-left { padding-top: 2rem; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hc-section oil-hero-bg">

        {/* LEFT */}
        <div className="hc-left">

          {/* Badge */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.7s 0.1s, transform 0.7s 0.1s' }}>
            <div className="hc-badge">
              <span className="hc-badge-dot" />
              <span>ISO 9001:2015 Certified</span>
              <span className="hc-badge-sep">|</span>
              <span>18+ Years</span>
              <span className="hc-badge-sep">|</span>
              <span>500+ Installations</span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity 0.7s 0.25s, transform 0.7s 0.25s' }}>
            <h1 className="hc-h1">
              {"India's Trusted"}<br />
              <span className="hc-highlight">Oil Filtration</span><br />
              Partner
            </h1>
          </div>

          {/* Rotating sequence */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s 0.35s, transform 0.7s 0.35s' }}>
            <div className="hc-seq-wrap">
              <div className="hc-seq-text" style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-6px)' }}>
                {current.text}
              </div>
              <div className="hc-seq-sub" style={{ opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(-6px)' }}>
                {current.sub}
              </div>
            </div>
          </div>

          {/* Trusted by pills */}
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s 0.45s, transform 0.7s 0.45s' }}>
            <p className="hc-trust-label">Trusted by</p>
            <div className="hc-pills">
              {['Tata Motors', 'Mahindra', 'JSW Steel', 'Ashok Leyland'].map(c => (
                <span key={c} className="hc-pill">{c}</span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="hc-cta-row" style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.7s 0.55s, transform 0.7s 0.55s' }}>
            <Link href="/contact" className="hc-btn-p">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link href="/contact?audit=true" className="hc-btn-s">
              Free Filtration Audit
            </Link>
          </div>

          {/* Trust row */}
          <div className="hc-trust-row" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.7s 0.7s' }}>
            {[
              { Icon: Shield, text: 'No cost assessment' },
              { Icon: Zap, text: 'Response in 24 hrs' },
              { Icon: Award, text: 'ISO certified engineers' },
            ].map(({ Icon, text }) => (
              <div key={text} className="hc-trust-item">
                <Icon size={15} color="#22C55E" style={{ flexShrink: 0 }} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="hc-right"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s',
          }}
        >
          <div className="hc-tank-wrap">
            <div className="hc-glow" />

            {/* Stat — top left */}
            {/* Stat — bottom left (Moved to clear the control panel) */}
            <div className="hc-stat" style={{ bottom: '25%', left: '-8%', animation: 'hc-float 4s ease-in-out infinite' }}>
              <div className="hc-stat-val">40%</div>
              <div className="hc-stat-lbl">Cost Reduction</div>
            </div>

            {/* Stat — mid right */}
            <div className="hc-stat" style={{ top: '38%', right: '-2%', animation: 'hc-float 4s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="hc-stat-val">99%</div>
              <div className="hc-stat-lbl">Filtration Rate</div>
            </div>

            {/* Stat — bottom right */}
            <div className="hc-stat" style={{ bottom: '14%', right: '-2%', animation: 'hc-float 4s ease-in-out infinite', animationDelay: '2s' }}>
              <div className="hc-stat-val">3–5x</div>
              <div className="hc-stat-lbl">Oil Life Extended</div>
            </div>

            {/* Tank */}
            <div className="hc-tank-inner">
              <OilFiltrationTank />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hc-scroll-hint" style={{ opacity: loaded ? 0.6 : 0, transition: 'opacity 1s 1.5s' }}>
          <span>Scroll to explore</span>
          <ChevronDown size={18} color="#B8860B" className="hc-bounce" />
        </div>
      </section>
    </>
  )
}